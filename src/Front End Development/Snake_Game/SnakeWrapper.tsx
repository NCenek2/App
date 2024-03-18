import { SnakeProvider } from "./SnakeContext";
import SnakeGame from "./SnakeGame";

const SnakeWrapper = () => {
  return (
    <SnakeProvider>
      <SnakeGame />
    </SnakeProvider>
  );
};

export default SnakeWrapper;
