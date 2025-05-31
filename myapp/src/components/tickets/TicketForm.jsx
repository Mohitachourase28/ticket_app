/* eslint-disable no-unused-vars */
import { useState } from "react";
import PropTypes from "prop-types";
import {
  collection,
  addDoc,
  getDocs,
  query,
  orderBy,
  limit,
  Timestamp,
} from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig.js";
import { toast } from "react-hot-toast";
import { useAuth } from "../../context/AuthContext.jsx";

const TicketForm = ({ role, closeModal }) => {
  const { user, userRole: contextUserRole } = useAuth();
  const userRole = role || contextUserRole || "agent";

  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState("Low");

  if (!user || !user.uid) {
    return <p>Please log in to submit a ticket.</p>;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const q = query(
        collection(db, "tickets"),
        orderBy("createdAt", "desc"),
        limit(1)
      );
      const querySnapshot = await getDocs(q);

      let nextId = 1;
      if (!querySnapshot.empty) {
        const lastTicket = querySnapshot.docs[0].data();
        const lastIdNumber = parseInt(lastTicket.id?.replace("TK-", "")) || 0;
        nextId = lastIdNumber + 1;
      }

      const newTicket = {
        id: `TK-${nextId}`,
        title,
        priority,
        status: "Open",
        createdBy: user.uid,
        createdAt: Timestamp.now(),
        assignedTo: null,
        avatarUrl: user.photoURL || "https://avatar.iran.liara.run/public/boy",
        user: user.displayName || user.email || "User",
        tags: [priority, "Open"],
      };

      await addDoc(collection(db, "tickets"), newTicket);

      toast.success("Ticket submitted successfully!");
      setTitle("");
      setPriority("Low");
      if (closeModal) closeModal();
    } catch (err) {
      console.error("Failed to submit ticket:", err);
      toast.error("Failed to submit ticket.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 max-w-xl mx-auto">
      <h2 className="text-xl font-semibold mb-4">Create a Ticket</h2>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Enter ticket title"
        className="border p-2 w-full mb-2"
        required
      />

      <select
        value={priority}
        onChange={(e) => setPriority(e.target.value)}
        className="border p-2 w-full mb-2"
      >
        <option value="Low">Low</option>
        <option value="Medium">Medium</option>
        <option value="High">High</option>
      </select>

      <div className="flex justify-end gap-2">
        <button
          type="button"
          onClick={closeModal}
          className="bg-gray-400 text-white px-4 py-2 rounded"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Submit Ticket
        </button>
      </div>
    </form>
  );
};

TicketForm.propTypes = {
  role: PropTypes.string,
  closeModal: PropTypes.func,
};

export default TicketForm;