import { doc, getDoc } from "firebase/fireStore.js";
import { db } from "./firebaseConfig.js";

export const getUserRole = async (uid) => {
  const userDoc = await getDoc(doc(db, "users", uid));
  return userDoc.exists() ? userDoc.data().role : null;
};
