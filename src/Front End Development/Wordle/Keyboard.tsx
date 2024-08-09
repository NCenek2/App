import { useEffect } from "react";

type KeyboardProps = {
  addLetter: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  removeLetter: () => void;
  checkWord: () => void;
};

const Keyboard = ({ addLetter, removeLetter, checkWord }: KeyboardProps) => {
  useEffect(() => {
    const keyPress = (e: Event) => {
      const keyboardEvent = e as KeyboardEvent;

      if (keyboardEvent.key == "Tab") {
        keyboardEvent.preventDefault();
      } else if (/^[a-z]$/i.test(keyboardEvent.key)) {
        const letter = document.getElementById(
          keyboardEvent.key.toUpperCase()
        ) as HTMLInputElement;
        letter?.click();
      } else if (keyboardEvent.key == "Backspace") {
        const deleteKey = document.getElementById(
          keyboardEvent.key
        ) as HTMLInputElement;
        deleteKey?.click();
      } else if (keyboardEvent.key == "Enter") {
        keyboardEvent.preventDefault();
        const enterKey = document.getElementById(
          keyboardEvent.key
        ) as HTMLInputElement;
        enterKey?.click();
      }
    };
    document.addEventListener("keydown", keyPress);
    return () => document.removeEventListener("keydown", keyPress);
  }, []);

  return (
    <>
      <div className="keyboard-container">
        <button id="Q" onClick={addLetter} className={`wordle-key gray-key `}>
          Q
        </button>
        <button id="W" onClick={addLetter} className={`wordle-key gray-key `}>
          W
        </button>
        <button id="E" onClick={addLetter} className={`wordle-key gray-key `}>
          E
        </button>
        <button id="R" onClick={addLetter} className={`wordle-key gray-key `}>
          R
        </button>
        <button id="T" onClick={addLetter} className={`wordle-key gray-key `}>
          T
        </button>
        <button id="Y" onClick={addLetter} className={`wordle-key gray-key `}>
          Y
        </button>
        <button id="U" onClick={addLetter} className={`wordle-key gray-key `}>
          U
        </button>
        <button id="I" onClick={addLetter} className={`wordle-key gray-key `}>
          I
        </button>
        <button id="O" onClick={addLetter} className={`wordle-key gray-key `}>
          O
        </button>
        <button id="P" onClick={addLetter} className={`wordle-key gray-key `}>
          P
        </button>
        <span></span>
        <button id="A" onClick={addLetter} className={`wordle-key gray-key `}>
          A
        </button>
        <button id="S" onClick={addLetter} className={`wordle-key gray-key `}>
          S
        </button>
        <button id="D" onClick={addLetter} className={`wordle-key gray-key `}>
          D
        </button>
        <button id="F" onClick={addLetter} className={`wordle-key gray-key `}>
          F
        </button>
        <button id="G" onClick={addLetter} className={`wordle-key gray-key `}>
          G
        </button>
        <button id="H" onClick={addLetter} className={`wordle-key gray-key `}>
          H
        </button>
        <button id="J" onClick={addLetter} className={`wordle-key gray-key `}>
          J
        </button>
        <button id="K" onClick={addLetter} className={`wordle-key gray-key `}>
          K
        </button>
        <button id="L" onClick={addLetter} className={`wordle-key gray-key `}>
          L
        </button>
        <span></span>
        <button
          id="Enter"
          onClick={() => checkWord()}
          className={`wordle-key gray-key wordle-lg-key`}
        >
          Enter
        </button>
        <button id="Z" onClick={addLetter} className={`wordle-key gray-key `}>
          Z
        </button>
        <button id="X" onClick={addLetter} className={`wordle-key gray-key `}>
          X
        </button>
        <button id="C" onClick={addLetter} className={`wordle-key gray-key `}>
          C
        </button>
        <button id="V" onClick={addLetter} className={`wordle-key gray-key `}>
          V
        </button>
        <button id="B" onClick={addLetter} className={`wordle-key gray-key `}>
          B
        </button>
        <button id="N" onClick={addLetter} className={`wordle-key gray-key `}>
          N
        </button>
        <button id="M" onClick={addLetter} className={`wordle-key gray-key `}>
          M
        </button>
        <button
          id="Backspace"
          onClick={removeLetter}
          className={`wordle-key gray-key wordle-lg-key`}
        >
          Del
        </button>
      </div>
    </>
  );
};

export default Keyboard;
