import React from "react";
import "./SnakeGame.css";

const SnakeGame = () => {
  const [gameMode, setGameMode] = React.useState("");
  const [speed, setSpeed] = React.useState(0);
  const [spacing, setSpacing] = React.useState(20);
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
      if (turn == "UP") {
        setSnakeCoordinate((currentCoordinate) => {
          // Start new
          const nextYCoordinate = currentCoordinate[1] - spacing;
          const nextArray = [currentCoordinate[0], nextYCoordinate];
          if (nextYCoordinate < -360) {
            // Border Crash
            setPlaying(false);
            handleReset();
            return currentCoordinate;
          } else if (
            currentCoordinate[0] == foodCoordinate[0] &&
            nextYCoordinate == foodCoordinate[1]
          ) {
            // Food Collection
            increaseScore();
            setPrevPoints((oldPoints) => {
              let oldArray = [...oldPoints];
              oldArray.unshift(currentCoordinate);
              return oldArray;
            });
            return nextArray;
          } else if (
            prevPoints.filter((item, index) => {
              return (
                item[0] == currentCoordinate[0] &&
                item[1] == currentCoordinate[1]
              );
            }).length > 0
          ) {
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
      } else if (turn == "RIGHT") {
        setSnakeCoordinate((currentCoordinate) => {
          const nextXCoordinate = currentCoordinate[0] + spacing;
          const nextArray = [nextXCoordinate, currentCoordinate[1]];
          if (nextXCoordinate > 140) {
            setPlaying(false);
            handleReset();
            return currentCoordinate;
          } else if (
            nextXCoordinate == foodCoordinate[0] &&
            currentCoordinate[1] == foodCoordinate[1]
          ) {
            increaseScore();
            setPrevPoints((oldPoints) => {
              let oldArray = [...oldPoints];
              oldArray.unshift(currentCoordinate);
              return oldArray;
            });
            return nextArray;
          } else if (
            prevPoints.filter((item, index) => {
              return (
                item[0] == currentCoordinate[0] &&
                item[1] == currentCoordinate[1]
              );
            }).length > 0
          ) {
            setPlaying(false);
            handleReset();
            return currentCoordinate;
          }
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
      } else if (turn == "DOWN") {
        setSnakeCoordinate((currentCoordinate) => {
          const nextYCoordinate = currentCoordinate[1] + spacing;
          const nextArray = [currentCoordinate[0], nextYCoordinate];
          if (nextYCoordinate > 0) {
            setPlaying(false);
            handleReset();
            return currentCoordinate;
          } else if (
            currentCoordinate[0] == foodCoordinate[0] &&
            nextYCoordinate == foodCoordinate[1]
          ) {
            increaseScore();
            setPrevPoints((oldPoints) => {
              let oldArray = [...oldPoints];
              oldArray.unshift(currentCoordinate);
              return oldArray;
            });
            return nextArray;
          } else if (
            prevPoints.filter((item, index) => {
              return (
                item[0] == currentCoordinate[0] &&
                item[1] == currentCoordinate[1]
              );
            }).length > 0
          ) {
            setPlaying(false);
            handleReset();
            return currentCoordinate;
          }
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
      } else {
        setSnakeCoordinate((currentCoordinate) => {
          const nextXCoordinate = currentCoordinate[0] - spacing;
          const nextArray = [nextXCoordinate, currentCoordinate[1]];
          if (nextXCoordinate < -140) {
            setPlaying(false);
            handleReset();
            return currentCoordinate;
          } else if (
            nextXCoordinate == foodCoordinate[0] &&
            currentCoordinate[1] == foodCoordinate[1]
          ) {
            increaseScore();
            setPrevPoints((oldPoints) => {
              let oldArray = [...oldPoints];
              oldArray.unshift(currentCoordinate);
              return oldArray;
            });
            return nextArray;
          } else if (
            prevPoints.filter((item, index) => {
              return (
                item[0] == currentCoordinate[0] &&
                item[1] == currentCoordinate[1]
              );
            }).length > 0
          ) {
            setPlaying(false);
            handleReset();
            return currentCoordinate;
          }
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
      }
    };

    if (playing) {
      const handleScore = setInterval(() => {
        handleTurn();
      }, speed);
      return () => clearInterval(handleScore);
    }
  }, [turn, playing]);

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
  const handleDifficulty = (mode) => {
    if (mode == "EASY") {
      if (window.innerWidth < 800) {
        setSpeed(75);
      } else {
        setSpeed(60);
      }
    } else if (mode == "MEDIUM") {
      if (window.innerWidth < 800) {
        setSpeed(60);
      } else {
        setSpeed(45);
      }
    } else {
      if (window.innerWidth < 800) {
        setSpeed(45);
      } else {
        setSpeed(30);
      }
    }
    setGameMode(mode);
    setPlaying(true);
  };

  // Handles Reset to Select Difficulty
  const handleReset = () => {
    function resetFunctions() {
      setGameMode("");
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
          onClick={() => handleDifficulty("EASY")}
        >
          Easy
        </button>
        <button
          className="btn btn-primary"
          onClick={() => handleDifficulty("MEDIUM")}
        >
          Medium
        </button>
        <button
          className="btn btn-danger"
          onClick={() => handleDifficulty("HARD")}
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
