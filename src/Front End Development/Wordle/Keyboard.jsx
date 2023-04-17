import React from "react";
const Keyboard = ({ addLetter, removeLetter, checkWord }) => {
  React.useEffect(() => {
    const keyPress = (event) => {
      if (event.key == "Tab") {
        event.preventDefault();
      } else if (/^[a-z]$/i.test(event.key)) {
        const letter = document.getElementById(event.key.toUpperCase());
        letter.click();
      } else if (event.key == "Backspace") {
        const deleteKey = document.getElementById(event.key);
        deleteKey.click()
      } else if (event.key == "Enter") {
        event.preventDefault()
        const enterKey = document.getElementById(event.key);
        enterKey.click()
      }
    };
    document.addEventListener("keydown", keyPress);
    return () => document.removeEventListener("keydown", keyPress);
  }, []);

  return (
    <React.Fragment>
      <div className="keyboard-container">
        <button
          id="Q"
          onClick={(e) => addLetter(e)}
          className={`wordle-key gray-key `}
        >
          Q
        </button>
        <button
          id="W"
          onClick={(e) => addLetter(e)}
          className={`wordle-key gray-key `}
        >
          W
        </button>
        <button
          id="E"
          onClick={(e) => addLetter(e)}
          className={`wordle-key gray-key `}
        >
          E
        </button>
        <button
          id="R"
          onClick={(e) => addLetter(e)}
          className={`wordle-key gray-key `}
        >
          R
        </button>
        <button
          id="T"
          onClick={(e) => addLetter(e)}
          className={`wordle-key gray-key `}
        >
          T
        </button>
        <button
          id="Y"
          onClick={(e) => addLetter(e)}
          className={`wordle-key gray-key `}
        >
          Y
        </button>
        <button
          id="U"
          onClick={(e) => addLetter(e)}
          className={`wordle-key gray-key `}
        >
          U
        </button>
        <button
          id="I"
          onClick={(e) => addLetter(e)}
          className={`wordle-key gray-key `}
        >
          I
        </button>
        <button
          id="O"
          onClick={(e) => addLetter(e)}
          className={`wordle-key gray-key `}
        >
          O
        </button>
        <button
          id="P"
          onClick={(e) => addLetter(e)}
          className={`wordle-key gray-key `}
        >
          P
        </button>
        <span></span>
        <button
          id="A"
          onClick={(e) => addLetter(e)}
          className={`wordle-key gray-key `}
        >
          A
        </button>
        <button
          id="S"
          onClick={(e) => addLetter(e)}
          className={`wordle-key gray-key `}
        >
          S
        </button>
        <button
          id="D"
          onClick={(e) => addLetter(e)}
          className={`wordle-key gray-key `}
        >
          D
        </button>
        <button
          id="F"
          onClick={(e) => addLetter(e)}
          className={`wordle-key gray-key `}
        >
          F
        </button>
        <button
          id="G"
          onClick={(e) => addLetter(e)}
          className={`wordle-key gray-key `}
        >
          G
        </button>
        <button
          id="H"
          onClick={(e) => addLetter(e)}
          className={`wordle-key gray-key `}
        >
          H
        </button>
        <button
          id="J"
          onClick={(e) => addLetter(e)}
          className={`wordle-key gray-key `}
        >
          J
        </button>
        <button
          id="K"
          onClick={(e) => addLetter(e)}
          className={`wordle-key gray-key `}
        >
          K
        </button>
        <button
          id="L"
          onClick={(e) => addLetter(e)}
          className={`wordle-key gray-key `}
        >
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
        <button
          id="Z"
          onClick={(e) => addLetter(e)}
          className={`wordle-key gray-key `}
        >
          Z
        </button>
        <button
          id="X"
          onClick={(e) => addLetter(e)}
          className={`wordle-key gray-key `}
        >
          X
        </button>
        <button
          id="C"
          onClick={(e) => addLetter(e)}
          className={`wordle-key gray-key `}
        >
          C
        </button>
        <button
          id="V"
          onClick={(e) => addLetter(e)}
          className={`wordle-key gray-key `}
        >
          V
        </button>
        <button
          id="B"
          onClick={(e) => addLetter(e)}
          className={`wordle-key gray-key `}
        >
          B
        </button>
        <button
          id="N"
          onClick={(e) => addLetter(e)}
          className={`wordle-key gray-key `}
        >
          N
        </button>
        <button
          id="M"
          onClick={(e) => addLetter(e)}
          className={`wordle-key gray-key `}
        >
          M
        </button>
        <button
          id="Backspace"
          onClick={() => removeLetter()}
          className={`wordle-key gray-key wordle-lg-key`}
        >
          Del
        </button>
      </div>
    </React.Fragment>
  );
};

export default Keyboard;
