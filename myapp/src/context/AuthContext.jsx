/* eslint-disable react/prop-types */
import { createContext, useContext, useEffect, useState } from "react";
import { auth, db } from "../firebase/firebaseConfig.js";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import Loading from "../components/common/Loading.jsx"; // Optional for loading UI

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);

      if (currentUser) {
        try {
          const userDoc = await getDoc(doc(db, "users", currentUser.uid));
          if (userDoc.exists()) {
            const data = userDoc.data();
            const role = data?.role;

            if (role) {
              setUserRole(role);
              localStorage.setItem("userRole", role);
              localStorage.setItem("uid", currentUser.uid);
            } else {
              console.warn("No role found in Firestore.");
              clearLocalData();
            }
          } else {
            console.warn("User document does not exist in Firestore.");
            clearLocalData();
          }
        } catch (error) {
          console.error("Error fetching user role:", error);
        }
      } else {
        clearLocalData();
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const clearLocalData = () => {
    setUserRole(null);
    localStorage.removeItem("userRole");
    localStorage.removeItem("uid");
  };

  const logout = async () => {
    try {
      await signOut(auth);
      clearLocalData();
      setUser(null);
      window.location.href = "/";
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, userRole, logout, loading }}>
      {loading ? <Loading /> : children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);


// src/context/AuthContext.jsx
// import { createContext, useContext, useState } from "react";
// import PropTypes from "prop-types";

// const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [userRole, setUserRole] = useState("agent"); // set manually for test

//   console.log("AuthProvider loaded. userRole:", userRole); // SHOULD show

//   return (
//     <AuthContext.Provider value={{ userRole, setUserRole }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// AuthProvider.propTypes = {
//   children: PropTypes.node.isRequired,
// };

// // This hook is what you use inside components like Sidebar
// export const useAuth = () => {
//   return useContext(AuthContext);
// };

