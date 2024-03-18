import { Joystick } from "react-joystick-component";
import useSnake from "./useSnake";

const SnakeJoystick = () => {
  const { turn, setTurn, gameMode } = useSnake();

  const handleJoyStick = (e: any) => {
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

  return (
    <Joystick
      move={handleJoyStick}
      baseColor="white"
      stickColor={`${
        gameMode == "EASY" ? "green" : gameMode == "MEDIUM" ? "blue" : "red"
      }`}
      minDistance={30}
    />
  );
};

export default SnakeJoystick;
