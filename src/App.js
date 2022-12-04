import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./Main/Home";
import FrontEnd from "./Front End Development/FrontEnd";
import FruitStore from "./Front End Development/Fruit Store/FruitStore";
import Python from "./Python/Python";
import Calculator from "./Front End Development/Projects/Calculator";
import ColorBox from "./Front End Development/Projects/ColorBox";
import SoundDrum from "./Front End Development/Projects/SoundDrum";
import Timer from "./Front End Development/Projects/Timer";

const App = () => {
  const [showNav, setShowNav] = React.useState(false);

  const [percentage, setPercentage] = React.useState(0);
  const [isLoading, setIsLoading] = React.useState(true);

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
      }, 25);
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
          path="front-end-development"
          element={<FrontEnd showNav={showNav} toggleNav={toggleNav} />}
        />
        <Route path="fruit-store" element={<FruitStore />} />
        <Route
          path="python"
          element={<Python showNav={showNav} toggleNav={toggleNav} />}
        />
        <Route path="calculator" element={<Calculator />} />
        <Route path="color-box" element={<ColorBox />} />
        <Route path="sound-drum" element={<SoundDrum />} />
        <Route path="timer" element={<Timer />} />
      </Routes>
    </React.Fragment>
  );
};

export default App;
