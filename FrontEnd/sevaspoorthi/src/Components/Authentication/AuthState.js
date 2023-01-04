// import { useState } from "react";
// import fireAuth from "../../Config/Firebase";

// const [username,setUsername] = useState("")
// fireAuth.onAuthStateChanged((user)=>{
//     if(user){
//         setUsername(user.displayName);
//     }
//     else{
//         setUsername("");
//     }
// });

// export default username;

import React, { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import fireAuth from "../../Config/Firebase";


export const AuthContext = React.createContext("");

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    onAuthStateChanged(fireAuth, (user) => {
      if (user) {
        setCurrentUser(user);
      } else {
        setCurrentUser(null);
      }
    });
  }, [currentUser]);

  return (
    <AuthContext.Provider value={{ currentUser }}>
      {children}
    </AuthContext.Provider>
  );
};