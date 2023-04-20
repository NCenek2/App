import React from "react";
import "./SnakeGame.css";

const spacing = 20;
let gameMode = "";

const SnakeGame = () => {
  const [speed, setSpeed] = React.useState(0);
  const [score, setScore] = React.useState(0);
  const [playing, setPlaying] = React.useState(false);
  const [snakeCoordinate, setSnakeCoordinate] = React.useState([0, 0]);
  const [foodCoordinate, setFoodCoordinate] = React.useState([
    Math.floor((Math.random() * 281 - 140) / spacing) * spacing,
    Math.floor((Math.random() * -361) / spacing) * spacing,
  ]);
  const [turn, setTurn] = React.useState("UP");
  const [prevPoints, setPrevPoints] = React.useState([]);
  React.useEffect(() => {
    const increaseScore = () => {
      setScore((previousScore) => previousScore + 1);
      setFoodCoordinate([
        Math.floor((Math.random() * 281 - 140) / spacing) * spacing,
        Math.floor((Math.random() * -361) / spacing) * spacing,
      ]);
    };
    const handleTurn = () => {
      setSnakeCoordinate((currentCoordinate) => {
        let nextXCoordinate;
        let nextYCoordinate;
        let borderCrash;
        let onFood;
        // Start new
        if (turn == "UP") {
          nextXCoordinate = currentCoordinate[0];
          nextYCoordinate = currentCoordinate[1] - spacing;
          borderCrash = nextYCoordinate < -360;
          onFood =
            currentCoordinate[0] == foodCoordinate[0] &&
            nextYCoordinate == foodCoordinate[1];
        } else if (turn == "RIGHT") {
          nextXCoordinate = currentCoordinate[0] + spacing;
          nextYCoordinate = currentCoordinate[1];
          borderCrash = nextXCoordinate > 140;
          onFood =
            nextXCoordinate == foodCoordinate[0] &&
            currentCoordinate[1] == foodCoordinate[1];
        } else if (turn == "DOWN") {
          nextXCoordinate = currentCoordinate[0];
          nextYCoordinate = currentCoordinate[1] + spacing;
          borderCrash = nextYCoordinate > 0;
          onFood =
            currentCoordinate[0] == foodCoordinate[0] &&
            nextYCoordinate == foodCoordinate[1];
        } else {
          nextYCoordinate = currentCoordinate[1];
          nextXCoordinate = currentCoordinate[0] - spacing;
          borderCrash = nextXCoordinate < -140;
          onFood =
            nextXCoordinate == foodCoordinate[0] &&
            currentCoordinate[1] == foodCoordinate[1];
        }
        const nextArray = [nextXCoordinate, nextYCoordinate];
        const hitBody =
          prevPoints.filter((item, index) => {
            return (
              item[0] == currentCoordinate[0] && item[1] == currentCoordinate[1]
            );
          }).length > 0;
        if (borderCrash) {
          // Border Crash
          setPlaying(false);
          handleReset();
          return currentCoordinate;
        } else if (onFood) {
          // Food Collection
          increaseScore();
          setPrevPoints((oldPoints) => {
            let oldArray = [...oldPoints];
            oldArray.unshift(currentCoordinate);
            return oldArray;
          });
          // return nextArray;
        } else if (hitBody) {
          // Body Collision
          setPlaying(false);
          handleReset();
          return currentCoordinate;
        }
        // End Statement to update body
        if (prevPoints.length > 0) {
          setPrevPoints((previousPoints) =>
            previousPoints.map((obj, index) => {
              const VALUES = Object.values(previousPoints);
              if (index == 0) {
                return currentCoordinate;
              } else {
                const prevIndex = index - 1;
                const prevValue = VALUES[prevIndex];
                return prevValue;
              }
            })
          );
        }
        return nextArray;
      });
    };

    if (playing) {
      const handleScore = setInterval(() => {
        handleTurn();
      }, speed);
      return () => clearInterval(handleScore);
    }
  }, [turn, playing, prevPoints]);

  // Handles Key Presses
  React.useEffect(() => {
    const settingTurn = (e) => {
      if (e.key == "w" || e.keyCode == "38") {
        setTurn("UP");
      } else if (e.key == "d" || e.keyCode == "39") {
        setTurn("RIGHT");
      } else if (e.key == "s" || e.keyCode == "40") {
        setTurn("DOWN");
      } else if (e.key == "a" || e.keyCode == "37") {
        setTurn("LEFT");
      }
    };
    document.addEventListener("keydown", settingTurn);
    return () => document.removeEventListener("keydown", settingTurn);
  }, []);

  // Handles Speed Difficulty
  const handleDifficulty = (event) => {
    const { name: selectedMode } = event.target;

    if (selectedMode == "EASY") {
      window.innerWidth < 800 ? setSpeed(75) : setSpeed(70);
    } else if (selectedMode == "MEDIUM") {
      window.innerWidth < 800 ? setSpeed(70) : setSpeed(65);
    } else {
      window.innerWidth < 800 ? setSpeed(62) : setSpeed(58);
    }

    gameMode = selectedMode;
    setPlaying(true);
  };
  // Handles Reset to Select Difficulty
  const handleReset = () => {
    function resetFunctions() {
      gameMode = "";
      setSnakeCoordinate([0, 0]);
      setFoodCoordinate([
        Math.floor((Math.random() * 281 - 140) / spacing) * spacing,
        Math.floor((Math.random() * -361) / spacing) * spacing,
      ]);
      setTurn("UP");
      setPrevPoints([]);
      setScore(0);
    }

    const resetTimeout = setTimeout(resetFunctions, 3000);
    return () => clearTimeout(resetTimeout);
  };

  // Snake Translation
  const snakeStyle = {
    transform: `translate(${snakeCoordinate[0]}px, ${snakeCoordinate[1]}px)`,
  };

  // Food Translation
  const foodStyle = {
    transform: `translate(${foodCoordinate[0]}px, ${foodCoordinate[1]}px)`,
  };

  // Selecting Difficulty
  if (gameMode === "") {
    return (
      <div className="snake-difficulty">
        <button
          className="btn btn-success"
          name="EASY"
          onClick={handleDifficulty}
        >
          Easy
        </button>
        <button
          className="btn btn-primary"
          name="MEDIUM"
          onClick={handleDifficulty}
        >
          Medium
        </button>
        <button
          className="btn btn-danger"
          name="HARD"
          onClick={handleDifficulty}
        >
          Hard
        </button>
      </div>
    );
  } else {
    return (
      <main className="snake-game-container">
        <header
          className={`snake-header ${
            window.innerWidth >= 800 && "large-snake-header"
          }`}
        >
          <h3>{playing ? `Score: ${score}` : `CRASHED at ${score}`}</h3>
        </header>
        {window.innerWidth < 800 && (
          <div className="snake-controls-container">
            <button
              className="btn- btn-primary snake-control"
              onClick={() => setTurn("UP")}
            >
              W
            </button>
            <button
              className="btn- btn-primary snake-control"
              onClick={() => setTurn("LEFT")}
            >
              A
            </button>
            <button
              className="btn- btn-primary snake-control"
              onClick={() => setTurn("DOWN")}
            >
              S
            </button>
            <button
              className="btn- btn-primary snake-control"
              onClick={() => setTurn("RIGHT")}
            >
              D
            </button>
          </div>
        )}
        <div className="snake-container">
          {/* Handeling Border Color and Snake Color */}
          <div
            className={`snake-border ${
              gameMode == "EASY"
                ? "snake-border-easy"
                : gameMode == "MEDIUM"
                ? "snake-border-medium"
                : "snake-border-hard"
            } ${window.innerWidth >= 800 && "large-snake-border"}`}
          >
            <div
              className={`snake ${
                gameMode == "EASY"
                  ? "snake-easy"
                  : gameMode == "MEDIUM"
                  ? "snake-medium"
                  : "snake-hard"
              }`}
              style={snakeStyle}
            ></div>
            {/* Handles Update of Body */}
            {prevPoints.length > 0 &&
              prevPoints.map((body, index) => {
                const VALUES = Object.values(prevPoints);
                const bodyStyleRed = {
                  transform: `translate(${VALUES[index][0]}px, ${VALUES[index][1]}px)`,
                  backgroundColor: `${
                    gameMode == "EASY"
                      ? "rgb(0,75,0)"
                      : gameMode == "MEDIUM"
                      ? "rgb(0,0,125)"
                      : "rgb(125,0,0)"
                  }`,
                };

                return (
                  <div key={index} className="body" style={bodyStyleRed}></div>
                );
              })}
            <div className="food" style={foodStyle}></div>
          </div>
        </div>
      </main>
    );
  }
};

export default SnakeGame;
