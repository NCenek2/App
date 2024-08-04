import { Route, Routes } from "react-router-dom";
import Home from "./Main/Home";
import Wordle from "./Front End Development/Wordle/Wordle";
import RigelIndex from "./Front End Development/Rigel/RigelIndex";
import VizIndex from "./Front End Development/Viz/VizIndex";
import SnakeWrapper from "./Front End Development/Snake_Game/SnakeWrapper";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="snake-game" element={<SnakeWrapper />} />
        <Route path="/rigel/*" element={<RigelIndex />} />
        <Route path="/viz/*" element={<VizIndex />} />
        <Route path="wordle" element={<Wordle />} />
      </Routes>
    </>
  );
};

export default App;
