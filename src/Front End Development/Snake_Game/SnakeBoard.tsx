import useSnake from "./useSnake";

const SnakeBoard = () => {
  const {
    prevPoints,
    gameMode,
    snakeCoordinate,
    width,
    spacing,
    height,
    paddingX,
    foodCoordinate,
  } = useSnake();

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

    return <>{output}</>;
  };

  // Snake Translation
  const snakeStyle = {
    transform: `translate(${snakeCoordinate.value[0]}px, ${snakeCoordinate.value[1]}px)`,
  };

  // Food Translation
  const foodStyle = {
    transform: `translate(${foodCoordinate[0]}px, ${foodCoordinate[1]}px)`,
  };

  const snakeBoardStyle = {
    width: `${width + spacing}px`,
    maxWidth: "400px",
    height: `${height + spacing}px`,
    padding: `0px ${paddingX}px`,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };

  return (
    <div style={snakeBoardStyle}>
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
  );
};

export default SnakeBoard;
