import { ReactNode, createContext, useState } from "react";
import LinkedList, { Node } from "../../Main/LinkedList";

type SnakeState = {
  playing: boolean;
  gameMode: string;
  turn: string;
  speed: number;
  score: number;
  usingJoystick: boolean;
  snakeCoordinate: Node<number[]>;
  prevPoints: LinkedList<number[]>;
};

const initialSnakeState = {
  playing: false,
  gameMode: "",
  turn: "UP",
  speed: 0,
  score: 0,
  usingJoystick: false,
  snakeCoordinate: new Node<number[]>([0, 0]),
  prevPoints: new LinkedList<number[]>(),
};

const useSnakeContext = (initSnakeState: SnakeState) => {
  const spacing = 20; // In px
  const width = 200;
  const paddingX = 0;
  const height = 400;

  const getRandom = (measurement: number) => {
    return (
      Math.floor(
        (Math.random() * (measurement + 1) - measurement / 2) / spacing
      ) * spacing
    );
  };

  const [playing, setPlaying] = useState(initSnakeState.playing);
  const [gameMode, setGameMode] = useState(initSnakeState.gameMode);
  const [turn, setTurn] = useState(initSnakeState.turn);
  const [speed, setSpeed] = useState(initSnakeState.speed);
  const [score, setScore] = useState(initSnakeState.score);
  const [usingJoystick, setUsingJoystick] = useState(
    initSnakeState.usingJoystick
  );
  const [snakeCoordinate, setSnakeCoordinate] = useState(
    initSnakeState.snakeCoordinate
  );
  const [prevPoints, setPrevPoints] = useState(initSnakeState.prevPoints);

  const [foodCoordinate, setFoodCoordinate] = useState<number[]>([
    getRandom(width - paddingX),
    getRandom(height),
  ]);

  // Handles Reset to Select Difficulty
  const handleReset = () => {
    function resetFunctions() {
      setGameMode("");
      setSnakeCoordinate(new Node([0, 0]));
      setFoodCoordinate([getRandom(width - paddingX), getRandom(height)]);
      setTurn("UP");
      setPrevPoints(new LinkedList());
      setScore(0);
    }

    const resetTimeout = setTimeout(resetFunctions, 3000);
    return () => clearTimeout(resetTimeout);
  };

  return {
    spacing,
    width,
    paddingX,
    height,
    playing,
    setPlaying,
    gameMode,
    setGameMode,
    turn,
    setTurn,
    speed,
    setSpeed,
    score,
    setScore,
    usingJoystick,
    setUsingJoystick,
    snakeCoordinate,
    setSnakeCoordinate,
    prevPoints,
    setPrevPoints,
    foodCoordinate,
    setFoodCoordinate,
    handleReset,
    getRandom,
  };
};

export type UseSnakeContextType = ReturnType<typeof useSnakeContext>;

const useSnakeContextType: UseSnakeContextType = {
  spacing: 0,
  width: 0,
  paddingX: 0,
  height: 0,
  playing: initialSnakeState.playing,
  setPlaying: () => {},
  gameMode: initialSnakeState.gameMode,
  setGameMode: () => {},
  turn: initialSnakeState.turn,
  setTurn: () => {},
  speed: initialSnakeState.speed,
  setSpeed: () => {},
  score: initialSnakeState.score,
  setScore: () => {},
  usingJoystick: initialSnakeState.usingJoystick,
  setUsingJoystick: () => {},
  snakeCoordinate: initialSnakeState.snakeCoordinate,
  setSnakeCoordinate: () => {},
  prevPoints: initialSnakeState.prevPoints,
  setPrevPoints: () => {},
  foodCoordinate: [0, 0],
  setFoodCoordinate: () => {},
  handleReset: () => () => {},
  getRandom: (measurement: number) => measurement,
};

export const SnakeContext =
  createContext<UseSnakeContextType>(useSnakeContextType);

type ChildrenType = {
  children?: ReactNode | ReactNode[];
};

export const SnakeProvider = ({ children }: ChildrenType) => {
  return (
    <SnakeContext.Provider value={useSnakeContext(initialSnakeState)}>
      {children}
    </SnakeContext.Provider>
  );
};
