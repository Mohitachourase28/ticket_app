import { useEffect, useState } from "react";
import TicketList from "../../components/tickets/TicketList.jsx";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig.js";
import { useAuth } from "../../context/AuthContext.jsx";

const Tickets = () => {
  const { user } = useAuth();
  const [myTickets, setMyTickets] = useState([]);

  useEffect(() => {
    if (!user || !user.uid) return;

    const q = query(
      collection(db, "tickets"),
      where("createdBy", "==", user.uid)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const tickets = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setMyTickets(tickets);
    });

    return () => unsubscribe(); // Cleanup listener on unmount
  }, [user]);

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">My Tickets</h2>
      <TicketList tickets={myTickets} role="agent" />
      {myTickets.length === 0 && (
        <p className="text-gray-500 text-center mt-4">
          You have no submitted tickets.
        </p>
      )}
    </div>
  );
};

export default Tickets;
