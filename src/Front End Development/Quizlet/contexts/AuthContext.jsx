import React, { createContext, useState } from "react";
import useSessionStorage from "../../../hooks/useSessionStorage";
const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useSessionStorage("jwt", "");

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
