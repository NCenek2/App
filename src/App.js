import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./Main/Home";
import SnakeGame from "./Front End Development/Snake_Game/SnakeGame";
import Matlab from "./Matlab/Matlab";
import Quizlet from "./Front End Development/Quizlet/Quizlet";
import Wordle from "./Front End Development/Wordle/Wordle";
import { QuizletProvider } from "./Front End Development/Quizlet/QuizletProvider";
import QuizletWrapper from "./Front End Development/Quizlet/QuizletWrapper";

const App = () => {
  const [percentage, setPercentage] = React.useState(0);
  const [isLoading, setIsLoading] = React.useState(true);
  const [showNav, setShowNav] = React.useState(false);

  React.useEffect(() => {
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

  const toggleNav = () => {
    setShowNav((prevState) => !prevState);
  };

  return (
    <React.Fragment>
      <Routes>
        <Route
          path="/"
          element={
            <Home
              showNav={showNav}
              toggleNav={toggleNav}
              percentage={percentage}
              isLoading={isLoading}
            />
          }
        />
        <Route
          path="matlab"
          element={<Matlab showNav={showNav} toggleNav={toggleNav} />}
        />
        <Route path="snake-game" element={<SnakeGame />} />
        <Route path="quizlet" element={<QuizletWrapper />} />
        <Route path="wordle" element={<Wordle />} />
      </Routes>
    </React.Fragment>
  );
};

export default App;
