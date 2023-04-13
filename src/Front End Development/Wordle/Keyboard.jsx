import React from "react";
const Keyboard = ({ addLetter, removeLetter, checkWord }) => {
  return (
    <React.Fragment>
      <div className="keyboard-container">
        <div className="keyboard-row">
          <span
            id="Q"
            onClick={(e) => addLetter(e)}
            className={`keyboard btn btn-${
              window.innerWidth <= 400 ? "sm" : "md"
            } btn-secondary`}
          >
            Q
          </span>
          <span
            id="W"
            onClick={(e) => addLetter(e)}
            className={`keyboard btn btn-${
              window.innerWidth <= 400 ? "sm" : "md"
            } btn-secondary`}
          >
            W
          </span>
          <span
            id="E"
            onClick={(e) => addLetter(e)}
            className={`keyboard btn btn-${
              window.innerWidth <= 400 ? "sm" : "md"
            } btn-secondary`}
          >
            E
          </span>
          <span
            id="R"
            onClick={(e) => addLetter(e)}
            className={`keyboard btn btn-${
              window.innerWidth <= 400 ? "sm" : "md"
            } btn-secondary`}
          >
            R
          </span>
          <span
            id="T"
            onClick={(e) => addLetter(e)}
            className={`keyboard btn btn-${
              window.innerWidth <= 400 ? "sm" : "md"
            } btn-secondary`}
          >
            T
          </span>
          <span
            id="Y"
            onClick={(e) => addLetter(e)}
            className={`keyboard btn btn-${
              window.innerWidth <= 400 ? "sm" : "md"
            } btn-secondary`}
          >
            Y
          </span>
          <span
            id="U"
            onClick={(e) => addLetter(e)}
            className={`keyboard btn btn-${
              window.innerWidth <= 400 ? "sm" : "md"
            } btn-secondary`}
          >
            U
          </span>
          <span
            id="I"
            onClick={(e) => addLetter(e)}
            className={`keyboard btn btn-${
              window.innerWidth <= 400 ? "sm" : "md"
            } btn-secondary`}
          >
            I
          </span>
          <span
            id="O"
            onClick={(e) => addLetter(e)}
            className={`keyboard btn btn-${
              window.innerWidth <= 400 ? "sm" : "md"
            } btn-secondary`}
          >
            O
          </span>
          <span
            id="P"
            onClick={(e) => addLetter(e)}
            className={`keyboard btn btn-${
              window.innerWidth <= 400 ? "sm" : "md"
            } btn-secondary`}
          >
            P
          </span>
        </div>
        <div className="keyboard-row">
          <span
            id="A"
            onClick={(e) => addLetter(e)}
            className={`keyboard btn btn-${
              window.innerWidth <= 400 ? "sm" : "md"
            } btn-secondary`}
          >
            A
          </span>
          <span
            id="S"
            onClick={(e) => addLetter(e)}
            className={`keyboard btn btn-${
              window.innerWidth <= 400 ? "sm" : "md"
            } btn-secondary`}
          >
            S
          </span>
          <span
            id="D"
            onClick={(e) => addLetter(e)}
            className={`keyboard btn btn-${
              window.innerWidth <= 400 ? "sm" : "md"
            } btn-secondary`}
          >
            D
          </span>
          <span
            id="F"
            onClick={(e) => addLetter(e)}
            className={`keyboard btn btn-${
              window.innerWidth <= 400 ? "sm" : "md"
            } btn-secondary`}
          >
            F
          </span>
          <span
            id="G"
            onClick={(e) => addLetter(e)}
            className={`keyboard btn btn-${
              window.innerWidth <= 400 ? "sm" : "md"
            } btn-secondary`}
          >
            G
          </span>
          <span
            id="H"
            onClick={(e) => addLetter(e)}
            className={`keyboard btn btn-${
              window.innerWidth <= 400 ? "sm" : "md"
            } btn-secondary`}
          >
            H
          </span>
          <span
            id="J"
            onClick={(e) => addLetter(e)}
            className={`keyboard btn btn-${
              window.innerWidth <= 400 ? "sm" : "md"
            } btn-secondary`}
          >
            J
          </span>
          <span
            id="K"
            onClick={(e) => addLetter(e)}
            className={`keyboard btn btn-${
              window.innerWidth <= 400 ? "sm" : "md"
            } btn-secondary`}
          >
            K
          </span>
          <span
            id="L"
            onClick={(e) => addLetter(e)}
            className={`keyboard btn btn-${
              window.innerWidth <= 400 ? "sm" : "md"
            } btn-secondary`}
          >
            L
          </span>
        </div>
        <div className="keyboard-row">
          <span
            id="enter"
            onClick={() => checkWord()}
            className={`keyboard btn btn-${
              window.innerWidth <= 400 ? "sm" : "md"
            } btn-secondary`}
          >
            Enter
          </span>
          <span
            id="Z"
            onClick={(e) => addLetter(e)}
            className={`keyboard btn btn-${
              window.innerWidth <= 400 ? "sm" : "md"
            } btn-secondary`}
          >
            Z
          </span>
          <span
            id="X"
            onClick={(e) => addLetter(e)}
            className={`keyboard btn btn-${
              window.innerWidth <= 400 ? "sm" : "md"
            } btn-secondary`}
          >
            X
          </span>
          <span
            id="C"
            onClick={(e) => addLetter(e)}
            className={`keyboard btn btn-${
              window.innerWidth <= 400 ? "sm" : "md"
            } btn-secondary`}
          >
            C
          </span>
          <span
            id="V"
            onClick={(e) => addLetter(e)}
            className={`keyboard btn btn-${
              window.innerWidth <= 400 ? "sm" : "md"
            } btn-secondary`}
          >
            V
          </span>
          <span
            id="B"
            onClick={(e) => addLetter(e)}
            className={`keyboard btn btn-${
              window.innerWidth <= 400 ? "sm" : "md"
            } btn-secondary`}
          >
            B
          </span>
          <span
            id="N"
            onClick={(e) => addLetter(e)}
            className={`keyboard btn btn-${
              window.innerWidth <= 400 ? "sm" : "md"
            } btn-secondary`}
          >
            N
          </span>
          <span
            id="M"
            onClick={(e) => addLetter(e)}
            className={`keyboard btn btn-${
              window.innerWidth <= 400 ? "sm" : "md"
            } btn-secondary`}
          >
            M
          </span>
          <span
            onClick={() => removeLetter()}
            className={`keyboard btn btn-${
              window.innerWidth <= 400 ? "sm" : "md"
            } btn-secondary`}
          >
            Del
          </span>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Keyboard;
