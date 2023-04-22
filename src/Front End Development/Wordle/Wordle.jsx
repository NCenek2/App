import list4 from "./fourLetter";
import list5 from "./fiveLetter";
import list6 from "./sixLetter";
import React from "react";
import "./Wordle.css";
import Keyboard from "./Keyboard";

const Letters = ({ letterCount }) => {
  const letters = letterCount;
  const letterClass =
    letters == 4 ? "fourInput" : letters == 5 ? "fiveInput" : "sixInput";

  const container = [];
  let i = 0;
  for (let block = 0; block < 6; block++) {
    const section = [];
    const row = Math.floor(i / letters) + 1;
    for (i; i < letters * row; i++) {
      section.push(
        <input
          key={`${i}`}
          id={`i${i}`}
          name={`${row}`}
          className={`${letterClass} wordleTile`}
        />
      );
    }
    container.push(
      <div key={block} className="tile-section">
        {section}
      </div>
    );
  }
  return <div className="tile-container">{container}</div>;
};

const list = [list4, list5, list6];

const Wordle = () => {
  const [letterCount, setLetterCount] = React.useState(null);
  const [letterChosen, setLetterChosen] = React.useState(false);
  const [currentWord, setCurrentWord] = React.useState(null);
  const [success, SetSuccess] = React.useState(null);
  const [tileIndex, setTileIndex] = React.useState(0);
  const [currentRow, setCurrentRow] = React.useState(1);
  const [mainObj, setMainObj] = React.useState({});
  const [keyboardGreenSet, setKeyboardGreenSet] = React.useState(new Set());

  const handleCreateObj = (word, range) => {
    const tempObj = {};
    for (let i = 0; i < word.length; i++) {
      const letter = word[i];
      if (!(letter in tempObj)) {
        tempObj[letter] = new Set();
      }
      tempObj[letter].add(range[i]);
    }
    return tempObj;
  };

  const handleReset = () => {
    setLetterCount(null);
    setLetterChosen(false);
    setCurrentWord(null);
    SetSuccess(null);
    setTileIndex(0);
    setCurrentRow(1);
    setMainObj({});
    setKeyboardGreenSet(new Set());
  };

  const handleFinished = (status) => {
    SetSuccess(status);
  };

  const handleWordLength = (wordLength) => {
    setLetterCount(wordLength);
    handleWord(wordLength);
    setLetterChosen(true);
  };

  const handleWord = (wordLength) => {
    const selectedList = list[wordLength - 4];
    const randomIndex = Math.floor(Math.random() * selectedList.length);
    const randomWord = selectedList[randomIndex].word.toUpperCase();
    setMainObj(handleCreateObj(randomWord, [...Array(wordLength).keys()]));
    setCurrentWord(randomWord);
  };

  const checkWord = () => {
    if (tileIndex == currentRow * letterCount) {
      const currentCorrect = handleColors();
      if (currentCorrect == letterCount) return handleFinished(true);
      setCurrentRow((prevRow) => {
        const nextRow = prevRow + 1;
        if (nextRow == 7) return handleFinished(false);

        return nextRow;
      });
    }
  };

  const handleColors = () => {
    let count = 0;

    // Step 1: Gather Row Tiles And Create Guess Object
    const NodeList = document.querySelectorAll(`[name="${currentRow}"]`);
    const matches = [].slice.call(NodeList);

    let guessWord = "";
    for (let match of matches) {
      guessWord += match.value;
    }
    const guessRange = [...Array(letterCount * currentRow).keys()].slice(
      (currentRow - 1) * letterCount,
      letterCount * currentRow
    );
    const guessObj = handleCreateObj(guessWord, guessRange);

    // Step 2: Create Objects To Correctly Identify Tile Color
    const greenObj = {};
    const yellowObj = {};
    for (let letter in guessObj) {
      if (letter in mainObj) {
        guessObj[letter].forEach((index) => {
          if (mainObj[letter].has(index % letterCount)) {
            if (!(letter in greenObj)) greenObj[letter] = new Set();
            greenObj[letter].add(index);
          } else {
            if (!(letter in yellowObj)) yellowObj[letter] = new Set();
            yellowObj[letter].add(index);
          }
        });
      } else {
        document.querySelector(`#${letter}`).classList.remove("gray-key");
        document.querySelector(`#${letter}`).classList.add("dark-key");
      }
    }

    // Step 3: Set Tile Colors Green then Yellow
    // I Only Care About the localCompletedSet To Check
    // Whether or not to add yellows
    const localGreenKeyboardSet = new Set();
    const localCompletedSet = new Set();
    for (let letter in greenObj) {
      localGreenKeyboardSet.add(letter);

      if (mainObj[letter].size == greenObj[letter].size)
        localCompletedSet.add(letter);

      greenObj[letter].forEach((index) => {
        count++;
        document.querySelector(`#i${index}`).classList.add("green");
      });
    }
    for (let letter in yellowObj) {
      if (localCompletedSet.has(letter)) continue;
      const yellowIterator = yellowObj[letter].values();
      const index = yellowIterator.next().value;
      document.querySelector(`#i${index}`).classList.add("yellow");
    }

    // Step 4: Set Keyboard
    localGreenKeyboardSet.forEach((letter) => {
      if (!keyboardGreenSet.has(letter)) {
        document.querySelector(`#${letter}`).classList.remove("gray-key");
        document.querySelector(`#${letter}`).classList.remove("yellow-key");
        document.querySelector(`#${letter}`).classList.add("green-key");
      }
    });

    for (let letter in yellowObj) {
      if (localGreenKeyboardSet.has(letter) || keyboardGreenSet.has(letter)) {
        document.querySelector(`#${letter}`).classList.remove("yellow-key");
      } else {
        document.querySelector(`#${letter}`).classList.remove("gray-key");
        document.querySelector(`#${letter}`).classList.add("yellow-key");
      }
    }

    // Step 5: Set Global Green And Return Count

    setKeyboardGreenSet((prevGreenSet) => {
      localGreenKeyboardSet.forEach((letter) => {
        if (!prevGreenSet.has(letter)) prevGreenSet.add(letter);
      });
      return prevGreenSet;
    });

    return count;
  };

  const addLetter = (e) => {
    const { id } = e.target;
    if (tileIndex >= letterCount * currentRow) return;
    const tile = document.querySelector(`#i${tileIndex}`);
    tile.value = id;
    setTileIndex((p) => {
      return p + 1;
    });
  };

  const removeLetter = () => {
    if (tileIndex - 1 < (currentRow - 1) * letterCount) return;
    setTileIndex((p) => {
      const tile = document.querySelector(`#i${p - 1}`);
      tile.value = "";
      return p - 1;
    });
  };
  if (success !== null) {
    return (
      <main className="wordle-container">
        <h1>{success ? "You Won!" : "You Lost!"}</h1>
        <h2>The Word Was {currentWord}</h2>
        <button className="btn btn-outline-light" onClick={() => handleReset()}>
          Play Again!
        </button>
      </main>
    );
  }

  if (!letterChosen) {
    return (
      <main className="wordle-container">
        <Letters />
        <h2 className="wordleMargin">How Many Letters for the Wordle?</h2>
        <div className="wordleLetterCount">
          <button
            className="btn btn-secondary "
            onClick={() => handleWordLength(4)}
          >
            4
          </button>
          <button
            className="btn btn-secondary"
            onClick={() => handleWordLength(5)}
          >
            5
          </button>
          <button
            className="btn btn-secondary"
            onClick={() => handleWordLength(6)}
          >
            6
          </button>
        </div>
      </main>
    );
  }
  return (
    <main className="wordle-container">
      <Letters letterCount={letterCount} />
      <Keyboard
        addLetter={addLetter}
        removeLetter={removeLetter}
        checkWord={checkWord}
      />
    </main>
  );
};

export default Wordle;
