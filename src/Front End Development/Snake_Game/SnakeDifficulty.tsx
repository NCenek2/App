import { Form } from "react-bootstrap";

type SnakeDifficultyProps = {
  setSpeed: React.Dispatch<React.SetStateAction<number>>;
  setPlaying: React.Dispatch<React.SetStateAction<boolean>>;
  setGameMode: React.Dispatch<React.SetStateAction<string>>;
  usingJoystick: boolean;
  setUsingJoystick: React.Dispatch<React.SetStateAction<boolean>>;
};

const SnakeDifficulty = ({
  setSpeed,
  setPlaying,
  setGameMode,
  usingJoystick,
  setUsingJoystick,
}: SnakeDifficultyProps) => {
  const handleJoystick = () => {
    setUsingJoystick((prevJoystickValue) => !prevJoystickValue);
  };

  // Handles Speed Difficulty
  const handleDifficulty = (e: React.MouseEvent<HTMLButtonElement>) => {
    const { name: selectedMode } = e.currentTarget;

    if (selectedMode == "EASY") {
      window.innerWidth < 800 ? setSpeed(75) : setSpeed(70);
    } else if (selectedMode == "MEDIUM") {
      window.innerWidth < 800 ? setSpeed(70) : setSpeed(65);
    } else {
      window.innerWidth < 800 ? setSpeed(62) : setSpeed(58);
    }

    setGameMode(selectedMode);
    setPlaying(true);
  };

  return (
    <section className="snake-difficulty">
      <Form.Check
        type="switch"
        label="Use Joystick"
        readOnly
        checked={usingJoystick}
        onClick={handleJoystick}
      />
      <div className="snake-difficulty-buttons">
        <button
          className="btn btn-success"
          name="EASY"
          onClick={handleDifficulty}
        >
          Easy
        </button>
        <button
          className="btn btn-primary"
          name="MEDIUM"
          onClick={handleDifficulty}
        >
          Medium
        </button>
        <button
          className="btn btn-danger"
          name="HARD"
          onClick={handleDifficulty}
        >
          Hard
        </button>
      </div>
    </section>
  );
};

export default SnakeDifficulty;
