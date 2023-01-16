import React from "react";
import "./SnakeGame.css";

const SnakeGame = () => {
  const [gameMode, setGameMode] = React.useState("");
  const [speed, setSpeed] = React.useState(0);
  const [spacing, setSpacing] = React.useState(20);
  const [score, setScore] = React.useState(0);
  const [playing, setPlaying] = React.useState(false);
  const [direction, setDirection] = React.useState([0, 0]);
  const [foodCoordinate, setFoodCordinate] = React.useState([
    Math.floor((Math.random() * 281 - 140) / spacing) * spacing,
    Math.floor((Math.random() * -361) / spacing) * spacing,
  ]);
  const [turn, setTurn] = React.useState("UP");
  const [prevPoints, setPrevPoints] = React.useState([]);
  React.useEffect(() => {
    const increaseScore = () => {
      setScore((previousScore) => previousScore + 1);
      setFoodCordinate([
        Math.floor((Math.random() * 281 - 140) / spacing) * spacing,
        Math.floor((Math.random() * -361) / spacing) * spacing,
      ]);
    };
    const handleTurn = () => {
      if (turn == "UP") {
        setDirection((currentPosition) => {
          // Start new
          const nextCoordinate = currentPosition[1] - spacing;
          const nextArray = [currentPosition[0], nextCoordinate];
          if (nextCoordinate < -360) {
            setPlaying(false);
            handleReset();
            return currentPosition;
          } else if (
            currentPosition[0] == foodCoordinate[0] &&
            nextCoordinate == foodCoordinate[1]
          ) {
            increaseScore();
            setPrevPoints((oldPoints) => {
              let oldArray = [...oldPoints];
              oldArray.unshift(currentPosition);
              return oldArray;
            });
            return nextArray;
          } else if (
            prevPoints.filter((item, index) => {
              return (
                item[0] == currentPosition[0] && item[1] == currentPosition[1]
              );
            }).length > 0
          ) {
            setPlaying(false);
            handleReset();
            return currentPosition;
          }
          // End Statement to update body
          if (prevPoints.length > 0) {
            setPrevPoints((previousPoints) =>
              previousPoints.map((obj, index) => {
                const VALUES = Object.values(previousPoints);
                if (index == 0) {
                  return currentPosition;
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
        setDirection((currentPosition) => {
          const nextCoordinate = currentPosition[0] + spacing;
          const nextArray = [nextCoordinate, currentPosition[1]];
          if (nextCoordinate > 140) {
            setPlaying(false);
            handleReset();
            return currentPosition;
          } else if (
            nextCoordinate == foodCoordinate[0] &&
            currentPosition[1] == foodCoordinate[1]
          ) {
            increaseScore();
            setPrevPoints((oldPoints) => {
              let oldArray = [...oldPoints];
              oldArray.unshift(currentPosition);
              return oldArray;
            });
            return nextArray;
          } else if (
            prevPoints.filter((item, index) => {
              return (
                item[0] == currentPosition[0] && item[1] == currentPosition[1]
              );
            }).length > 0
          ) {
            setPlaying(false);
            handleReset();
            return currentPosition;
          }
          if (prevPoints.length > 0) {
            setPrevPoints((previousPoints) =>
              previousPoints.map((obj, index) => {
                const VALUES = Object.values(previousPoints);
                if (index == 0) {
                  return currentPosition;
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
        setDirection((currentPosition) => {
          const nextCoordinate = currentPosition[1] + spacing;
          const nextArray = [currentPosition[0], nextCoordinate];
          if (nextCoordinate > 0) {
            setPlaying(false);
            handleReset();
            return currentPosition;
          } else if (
            currentPosition[0] == foodCoordinate[0] &&
            nextCoordinate == foodCoordinate[1]
          ) {
            increaseScore();
            setPrevPoints((oldPoints) => {
              let oldArray = [...oldPoints];
              oldArray.unshift(currentPosition);
              return oldArray;
            });
            return nextArray;
          } else if (
            prevPoints.filter((item, index) => {
              return (
                item[0] == currentPosition[0] && item[1] == currentPosition[1]
              );
            }).length > 0
          ) {
            setPlaying(false);
            handleReset();
            return currentPosition;
          }
          if (prevPoints.length > 0) {
            setPrevPoints((previousPoints) =>
              previousPoints.map((obj, index) => {
                const VALUES = Object.values(previousPoints);
                if (index == 0) {
                  return currentPosition;
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
        setDirection((currentPosition) => {
          const nextCoordinate = currentPosition[0] - spacing;
          const nextArray = [nextCoordinate, currentPosition[1]];
          if (nextCoordinate < -140) {
            setPlaying(false);
            handleReset();
            return currentPosition;
          } else if (
            nextCoordinate == foodCoordinate[0] &&
            currentPosition[1] == foodCoordinate[1]
          ) {
            increaseScore();
            setPrevPoints((oldPoints) => {
              let oldArray = [...oldPoints];
              oldArray.unshift(currentPosition);
              return oldArray;
            });
            return nextArray;
          } else if (
            prevPoints.filter((item, index) => {
              return (
                item[0] == currentPosition[0] && item[1] == currentPosition[1]
              );
            }).length > 0
          ) {
            setPlaying(false);
            handleReset();
            return currentPosition;
          }
          if (prevPoints.length > 0) {
            setPrevPoints((previousPoints) =>
              previousPoints.map((obj, index) => {
                const VALUES = Object.values(previousPoints);
                if (index == 0) {
                  return currentPosition;
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
      setDirection([0, 0]);
      setFoodCordinate([
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
    transform: `translate(${direction[0]}px, ${direction[1]}px)`,
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
        <header className="snake-header">
          <h3>{playing ? `Score: ${score}` : `CRASHED at ${score}`}</h3>
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
        </header>
        <div className="snake-container">
          <div
            className={`snake-border ${
              gameMode == "EASY"
                ? "snake-border-easy"
                : gameMode == "MEDIUM"
                ? "snake-border-medium"
                : "snake-border-hard"
            }`}
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
