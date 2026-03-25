import { onAuthStateChanged } from "firebase/auth";
import { ref, onValue } from "firebase/database";
import { createContext, useContext, useEffect, useState } from "react";
import { auth, database } from "../firebase.jsx";

const AuthContext = createContext();
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(undefined);

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (firebaseUser) => {
      if (!firebaseUser) {
        setUser(null);
        return;
      }

      // Fetch the user's name from RTDB
      const nameRef = ref(database, `users/${firebaseUser.uid}/name`);
      const unsubscribeDB = onValue(nameRef, (snapshot) => {
        const name = snapshot.val() ?? firebaseUser.email.split("@")[0];
        setUser({ ...firebaseUser, name });
      });

      // Clean up DB listener when auth changes
      return () => unsubscribeDB();
    });

    return unsubscribeAuth;
  }, []);
  return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
export const useAuth = () => useContext(AuthContext);
