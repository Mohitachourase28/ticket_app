/* eslint-disable no-unused-vars */
// src/context/TicketContext.jsx
import { createContext, useContext, useEffect, useState } from "react";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  updateDoc,
  doc,
  onSnapshot,
  query,
  where,
  orderBy,
} from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";
import { useAuth } from "./AuthContext"; // Assumes you have an AuthContext for user & role
import PropTypes from "prop-types";

const TicketContext = createContext();

export const useTickets = () => useContext(TicketContext);

export const TicketProvider = ({ children }) => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const { currentUser, userRole } = useAuth(); // currentUser.uid, userRole: 'customer' or 'agent'

  useEffect(() => {
    if (!currentUser) return;

    const q =
      userRole === "agent"
        ? query(collection(db, "tickets"), orderBy("createdAt", "desc"))
        : query(
            collection(db, "tickets"),
            where("createdBy", "==", currentUser.uid),
            orderBy("createdAt", "desc")
          );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const ticketList = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setTickets(ticketList);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [currentUser, userRole]);

  // Create a new ticket
  const createTicket = async (ticketData) => {
    if (!currentUser) return;
    const ticket = {
      ...ticketData,
      createdBy: currentUser.uid,
      status: "Open",
      assignedTo: "",
    };
    
    await addDoc(collection(db, "tickets"), ticket);
  };

  // Update ticket (Only for agents)
  const updateTicket = async (ticketId, updates) => {
    if (userRole !== "agent") return;
    const ticketRef = doc(db, "tickets", ticketId);
    await updateDoc(ticketRef, updates);
  };

  // Delete ticket (Only for customers, and only their own tickets)
  const deleteTicket = async (ticketId) => {
    const ticketRef = doc(db, "tickets", ticketId);
    const snapshot = await ticketRef.get();

    if (userRole === "customer" && snapshot.data()?.createdBy === currentUser.uid) {
      await deleteDoc(ticketRef);
    } else if (userRole === "agent") {
      console.warn("Agents are not allowed to delete tickets.");
    }
  };

  return (
    <TicketContext.Provider
      value={{
        tickets,
        loading,
        createTicket,
        updateTicket,
        deleteTicket,
      }}
    >
      {children}
    </TicketContext.Provider>
  );
};

TicketProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
