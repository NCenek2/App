import useSnake from "./useSnake";

const SnakeHeader = () => {
  const { playing, score } = useSnake();
  return (
    <header className="snake-header">
      <h3>{playing ? `Score: ${score}` : `CRASHED at ${score}`}</h3>
    </header>
  );
};

export default SnakeHeader;
