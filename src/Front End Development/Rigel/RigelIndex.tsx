import React from "react";
import { AlertProvider } from "./contexts/AlertContext";
import { AuthProvider } from "./contexts/AuthContext";
import RigelApp from "./RigelApp";

const RigelIndex = () => {
  return (
    <AlertProvider>
      <AuthProvider>
        <RigelApp />
      </AuthProvider>
    </AlertProvider>
  );
};

export default RigelIndex;
