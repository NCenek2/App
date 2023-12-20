import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "bootstrap/dist/js/bootstrap.min";
import RigelApp from "./RigelApp";
import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";

const RigelIndex = () => {
  return (
    <div className="rigel-app-wrapper">
      <AuthProvider>
        <Routes>
          <Route path="/*" element={<RigelApp />} />
        </Routes>
      </AuthProvider>
    </div>
  );
};

export default RigelIndex;
