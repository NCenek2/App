import { useEffect } from "react";
import "./SnakeGame.css";
import SnakeDifficulty from "./SnakeDifficulty";
import { Node } from "../../Main/LinkedList";
import SnakeJoystick from "./SnakeJoystick";
import SnakeBoard from "./SnakeBoard";
import useSnake from "./useSnake";
import SnakeHeader from "./SnakeHeader";

const SnakeGame = () => {
  const {
    speed,
    gameMode,
    setScore,
    setFoodCoordinate,
    prevPoints,
    setPrevPoints,
    getRandom,
    width,
    paddingX,
    height,
    spacing,
    setSnakeCoordinate,
    turn,
    setTurn,
    foodCoordinate,
    playing,
    setPlaying,
    handleReset,
    usingJoystick,
  } = useSnake();

  useEffect(() => {
    const increaseScore = () => {
      setScore((previousScore) => previousScore + 1);
      setFoodCoordinate([
        getRandom(width === 400 ? 360 : width - paddingX),
        getRandom(height),
      ]);
    };

    const handleTurn = () => {
      setSnakeCoordinate((currentNode) => {
        let currentCoordinate = currentNode.value;
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
          let temp: number[] = [];
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
    return;
  }, [turn, playing, prevPoints]);

  // Handles Key Presses
  useEffect(() => {
    const settingTurn = (e: KeyboardEvent) => {
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

  // Selecting Difficulty
  if (gameMode === "") {
    return <SnakeDifficulty />;
  } else {
    return (
      <section className="snake-game-container">
        <SnakeHeader />
        <SnakeBoard />
        <div className="snake-joystick">
          {usingJoystick && <SnakeJoystick />}
        </div>
      </section>
    );
  }
};

export default SnakeGame;
