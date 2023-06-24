import React from "react";
import "./SnakeGame.css";
import SnakeDifficulty from "./SnakeDifficulty";
import LinkedList, { Node } from "../../Main/LinkedList";
import { Joystick } from "react-joystick-component";

const spacing = 20; // In px
const width = window.innerWidth >= 400 ? 400 : 200;
const paddingX = width >= 400 ? 10 : 0;
const height = 400;

const getRandom = (measurement) => {
  return (
    Math.floor(
      (Math.random() * (measurement + 1) - measurement / 2) / spacing
    ) * spacing
  );
};

const SnakeGame = () => {
  const [snakeBoardContainer, setSnakeBoardContainer] = React.useState({
    width: `${width + spacing}px`,
    maxWidth: "400px",
    height: `${height + spacing}px`,
    padding: `0px ${paddingX}px`,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  });

  const [playing, setPlaying] = React.useState(false);
  const [gameMode, setGameMode] = React.useState("");
  const [turn, setTurn] = React.useState("UP");
  const [speed, setSpeed] = React.useState(0);
  const [score, setScore] = React.useState(0);
  const [usingJoystick, setUsingJoystick] = React.useState(false);

  const [snakeCoordinate, setSnakeCoordinate] = React.useState(
    new Node([0, 0])
  );
  const [prevPoints, setPrevPoints] = React.useState(new LinkedList());
  const [foodCoordinate, setFoodCoordinate] = React.useState([
    getRandom(width == 400 ? 360 : width - paddingX),
    getRandom(height),
  ]);

  React.useEffect(() => {
    const increaseScore = () => {
      setScore((previousScore) => previousScore + 1);
      setFoodCoordinate([
        getRandom(width == 400 ? 360 : width - paddingX),
        getRandom(height),
      ]);
    };

    const handleTurn = () => {
      setSnakeCoordinate((currentCoordinate) => {
        currentCoordinate = currentCoordinate.value;
        let nextXCoordinate;
        let nextYCoordinate;
        let borderCrash;
        let onFood;

        // Start new
        if (turn == "UP") {
          nextXCoordinate = currentCoordinate[0];
          nextYCoordinate = currentCoordinate[1] - spacing;
          borderCrash = nextYCoordinate < -height / 2;
          onFood =
            currentCoordinate[0] == foodCoordinate[0] &&
            nextYCoordinate == foodCoordinate[1];
        } else if (turn == "RIGHT") {
          nextXCoordinate = currentCoordinate[0] + spacing;
          nextYCoordinate = currentCoordinate[1];
          borderCrash = nextXCoordinate > width / 2 - paddingX;
          onFood =
            nextXCoordinate == foodCoordinate[0] &&
            currentCoordinate[1] == foodCoordinate[1];
        } else if (turn == "DOWN") {
          nextXCoordinate = currentCoordinate[0];
          nextYCoordinate = currentCoordinate[1] + spacing;
          borderCrash = nextYCoordinate > height / 2;
          onFood =
            currentCoordinate[0] == foodCoordinate[0] &&
            nextYCoordinate == foodCoordinate[1];
        } else {
          nextYCoordinate = currentCoordinate[1];
          nextXCoordinate = currentCoordinate[0] - spacing;
          borderCrash = nextXCoordinate < -width / 2 + paddingX;
          onFood =
            nextXCoordinate == foodCoordinate[0] &&
            currentCoordinate[1] == foodCoordinate[1];
        }
        const nextArray = [nextXCoordinate, nextYCoordinate];

        let hitCount = 0;
        for (let cur = prevPoints.head; cur != null; cur = cur.next) {
          let [bodyX, bodyY] = cur.value;
          if (bodyX == currentCoordinate[0] && bodyY == currentCoordinate[1])
            hitCount++;
        }
        const hitBody = hitCount > 0;

        if (borderCrash) {
          // Border Crash
          setPlaying(false);
          handleReset();
          return new Node(currentCoordinate);
        } else if (onFood) {
          // Food Collection
          increaseScore();
          setPrevPoints((oldPoints) => {
            oldPoints.prepend(currentCoordinate);
            return oldPoints;
          });
          return new Node(nextArray);
        } else if (hitBody) {
          // Body Collision
          setPlaying(false);
          handleReset();
          return new Node(currentCoordinate);
        }

        // End Statement to update body
        setPrevPoints((previousPoints) => {
          let temp;
          for (let cur = previousPoints.head; cur != null; cur = cur.next) {
            if (cur == previousPoints.head) {
              temp = previousPoints.head.value;
              cur.value = currentCoordinate;
            } else {
              let temp2 = cur.value;
              cur.value = temp;
              temp = temp2;
            }
          }

          return prevPoints;
        });
        return new Node(nextArray);
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
      if (e.key == "w") {
        setTurn("UP");
      } else if (e.key == "d") {
        setTurn("RIGHT");
      } else if (e.key == "s") {
        setTurn("DOWN");
      } else if (e.key == "a") {
        setTurn("LEFT");
      }
    };
    document.addEventListener("keydown", settingTurn);
    return () => document.removeEventListener("keydown", settingTurn);
  }, []);

  const handleJoyStick = (e) => {
    const { direction } = e;
    if (direction == turn) return;
    if (direction == "FORWARD") {
      setTurn("UP");
    } else if (direction == "RIGHT") {
      setTurn("RIGHT");
    } else if (direction == "BACKWARD") {
      setTurn("DOWN");
    } else {
      setTurn("LEFT");
    }
  };

  // Handles Reset to Select Difficulty
  const handleReset = () => {
    function resetFunctions() {
      setGameMode("");
      setSnakeCoordinate(new Node([0, 0]));
      setFoodCoordinate([
        getRandom(width == 400 ? 360 : width - paddingX),
        getRandom(height),
      ]);
      setTurn("UP");
      setPrevPoints(new LinkedList());
      setScore(0);
    }

    const resetTimeout = setTimeout(resetFunctions, 3000);
    return () => clearTimeout(resetTimeout);
  };

  // Snake Translation
  const snakeStyle = {
    transform: `translate(${snakeCoordinate.value[0]}px, ${snakeCoordinate.value[1]}px)`,
  };

  // Food Translation
  const foodStyle = {
    transform: `translate(${foodCoordinate[0]}px, ${foodCoordinate[1]}px)`,
  };

  const renderBody = () => {
    if (prevPoints.length == 0) return null;

    let output = [];
    for (let body = prevPoints.head; body != null; body = body.next) {
      const [xValue, yValue] = body.value;
      const bodyStyleRed = {
        transform: `translate(${xValue}px, ${yValue}px)`,
        backgroundColor: `${
          gameMode == "EASY"
            ? "rgba(0, 180, 0, 0.5)"
            : gameMode == "MEDIUM"
            ? "rgba(0, 0, 180, 0.5)"
            : "rgba(180, 0, 0, 0.5)"
        }`,
      };
      output.push(
        <div
          key={`${xValue},${yValue}`}
          className="body"
          style={bodyStyleRed}
        ></div>
      );
    }

    return <React.Fragment>{output}</React.Fragment>;
  };

  // Selecting Difficulty
  if (gameMode === "") {
    return (
      <SnakeDifficulty
        setSpeed={setSpeed}
        setPlaying={setPlaying}
        setGameMode={setGameMode}
        usingJoystick={usingJoystick}
        setUsingJoystick={setUsingJoystick}
      />
    );
  } else {
    return (
      <section className="snake-game-container">
        <header
          className={`snake-header ${
            window.innerWidth >= 800 && "large-snake-header"
          }`}
        >
          <h3>{playing ? `Score: ${score}` : `CRASHED at ${score}`}</h3>
        </header>
        <div style={snakeBoardContainer}>
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
          {prevPoints.length > 0 && renderBody()}
          <div className="food" style={foodStyle}></div>
          <div
            className={`snake-board ${
              gameMode == "EASY"
                ? "snake-border-easy"
                : gameMode == "MEDIUM"
                ? "snake-border-medium"
                : "snake-border-hard"
            }`}
          ></div>
        </div>
        <div className="snake-joystick">
          {usingJoystick && (
            <Joystick
              move={handleJoyStick}
              baseColor="white"
              stickColor={`${
                gameMode == "EASY"
                  ? "green"
                  : gameMode == "MEDIUM"
                  ? "blue"
                  : "red"
              }`}
              minDistance={30}
            />
          )}
        </div>
      </section>
    );
  }
};

export default SnakeGame;
