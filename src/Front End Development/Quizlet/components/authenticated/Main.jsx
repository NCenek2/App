import React from "react";
import { CardProvider } from "../../contexts/DeckContext";
import MainSwitch from "./MainSwitch";
import { ModeProvider } from "../../contexts/ModeContext";

const Main = () => {
  return (
    <CardProvider>
      <ModeProvider>
        <MainSwitch />
      </ModeProvider>
    </CardProvider>
  );
};

export default Main;
