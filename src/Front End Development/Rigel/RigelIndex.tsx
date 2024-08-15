import React, { useEffect } from "react";
import { AlertProvider } from "./contexts/AlertContext";
import { AuthProvider } from "./contexts/AuthContext";
import RigelApp from "./RigelApp";

const RigelIndex = () => {
  useEffect(() => {
    const head = document.head;
    const rigelInitLink = document.createElement("link");
    const rigelLink = document.createElement("link");

    rigelInitLink.type = "text/css";
    rigelInitLink.rel = "stylesheet";
    rigelInitLink.href = "RigelInit.css";
    rigelLink.type = "text/css";
    rigelLink.rel = "stylesheet";
    rigelLink.href = "Rigel.css";

    head.appendChild(rigelInitLink);
    head.appendChild(rigelLink);

    return () => {
      head.removeChild(rigelInitLink);
      head.removeChild(rigelLink);
    };
  }, []);

  return (
    <AlertProvider>
      <AuthProvider>
        <div className="rigel-wrapper">
          <RigelApp />
        </div>
      </AuthProvider>
    </AlertProvider>
  );
};

export default RigelIndex;
