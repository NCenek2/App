import { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./Main/Home";
import SnakeGame from "./Front End Development/Snake_Game/SnakeGame";
import Matlab from "./Matlab/Matlab";
import Wordle from "./Front End Development/Wordle/Wordle";
import RigelIndex from "./Front End Development/Rigel/RigelIndex";

const App = () => {
  const [percentage, setPercentage] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (isLoading) {
      const increasePercentage = setInterval(() => {
        setPercentage((prevPercentage) => {
          const newPercentage = prevPercentage + 1;
          if (newPercentage > 100) {
            setIsLoading(false);
            return prevPercentage;
          }
          return newPercentage;
        });
        return () => clearInterval(increasePercentage);
      }, 10);
    }
    return undefined;
  }, [isLoading]);

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={<Home percentage={percentage} isLoading={isLoading} />}
        />
        <Route path="matlab" element={<Matlab />} />
        <Route path="snake-game" element={<SnakeGame />} />
        <Route path="/rigel/*" element={<RigelIndex />} />
        <Route path="wordle" element={<Wordle />} />
      </Routes>
    </>
  );
};

export default App;
