import { onAuthStateChanged } from "firebase/auth";
import { child, get, ref } from "firebase/database";
import React, { useEffect, useState } from "react";
import { fireAuth, fireDb } from "../Config/Firebase";

export const AuthContext = React.createContext("");

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [checkAdmin,setCheckAdmin] = useState(false);

  useEffect(() => {
    onAuthStateChanged(fireAuth, async (user) => {
      if (user) {
        setCurrentUser(user);
        await get(child(ref(fireDb),`Admin/${user.uid}`)).then((snapshot)=>{
          if(snapshot.exists()){
              setCheckAdmin(true);
          }
        });
      } else {
        setCurrentUser(null);
        setCheckAdmin(false);
      }
    });
  }, [currentUser]);

  return (
    <AuthContext.Provider value={{ currentUser,checkAdmin }}>
      {children}
    </AuthContext.Provider>
  );
};