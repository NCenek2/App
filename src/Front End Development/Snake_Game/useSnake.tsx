import { useContext } from "react";
import { SnakeContext, UseSnakeContextType } from "./SnakeContext";

const useSnake = () => {
  return useContext<UseSnakeContextType>(SnakeContext);
};

export default useSnake;
