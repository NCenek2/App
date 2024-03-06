import { useState } from "react";
import list4 from "./fourLetter";
import list5 from "./fiveLetter";
import list6 from "./sixLetter";
import Keyboard from "./Keyboard";
import Letters from "./Letters";
import "./Wordle.css";

export type WordleWord = {
  word: string;
};

const list = [list4, list5, list6];

type LettersType =
  | "A"
  | "B"
  | "C"
  | "D"
  | "E"
  | "F"
  | "G"
  | "H"
  | "I"
  | "J"
  | "K"
  | "L"
  | "M"
  | "N"
  | "O"
  | "P"
  | "Q"
  | "R"
  | "S"
  | "T"
  | "U"
  | "V"
  | "W"
  | "X"
  | "Y"
  | "Z";

type LettersObject = Record<LettersType, Set<number>>;

const Wordle = () => {
  const [letterCount, setLetterCount] = useState(4);
  const [letterChosen, setLetterChosen] = useState(false);
  const [currentWord, setCurrentWord] = useState<string>("");
  const [success, SetSuccess] = useState<null | boolean>(null);
  const [tileIndex, setTileIndex] = useState(0);
  const [currentRow, setCurrentRow] = useState(1);
  const [mainObj, setMainObj] = useState<LettersObject>({} as LettersObject);
  const [keyboardGreenSet, setKeyboardGreenSet] = useState(new Set());

  const handleCreateObj = (word: string, range: number[]) => {
    const tempObj = {} as LettersObject;
    for (let i = 0; i < word.length; i++) {
      const letter = word[i] as LettersType;
      if (!(letter in tempObj)) {
        tempObj[letter] = new Set<number>();
      }
      tempObj[letter].add(range[i]);
    }
    return tempObj;
  };

  const handleReset = () => {
    setLetterCount(4);
    setLetterChosen(false);
    setCurrentWord("");
    SetSuccess(null);
    setTileIndex(0);
    setCurrentRow(1);
    setMainObj({} as LettersObject);
    setKeyboardGreenSet(new Set());
  };

  const handleFinished = (status: boolean) => {
    SetSuccess(status);
  };

  const handleWordLength = (wordLength: number) => {
    setLetterCount(wordLength);
    handleWord(wordLength);
    setLetterChosen(true);
  };

  const handleWord = (wordLength: number) => {
    const selectedList = list[wordLength - 4];
    const randomIndex = Math.floor(Math.random() * selectedList.length);
    const randomWord = selectedList[randomIndex].word.toUpperCase();
    setMainObj(handleCreateObj(randomWord, [...Array(wordLength)]));
    setCurrentWord(randomWord);
  };

  const checkWord = () => {
    if (tileIndex == currentRow * letterCount) {
      const currentCorrect = handleColors();
      if (currentCorrect == letterCount) return handleFinished(true);
      setCurrentRow((prevRow) => {
        const nextRow = prevRow + 1;
        if (nextRow == 7) {
          handleFinished(false);
          return prevRow;
        }
        return nextRow;
      });
    }
  };

  const handleColors = () => {
    let count = 0;

    // Step 1: Gather Row Tiles And Create Guess Object
    const NodeList = document.querySelectorAll(`[name="${currentRow}"]`);
    const matches: any = [].slice.call(NodeList);

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
    const greenObj = {} as LettersObject;
    const yellowObj = {} as LettersObject;
    for (let letter in guessObj) {
      let typedLetter = letter as LettersType;
      if (letter in mainObj) {
        guessObj[typedLetter].forEach((index: number) => {
          if (mainObj[typedLetter].has(index % letterCount)) {
            if (!(typedLetter in greenObj))
              greenObj[typedLetter] = new Set<number>();
            greenObj[typedLetter].add(index);
          } else {
            if (!(typedLetter in yellowObj))
              yellowObj[typedLetter] = new Set<number>();
            yellowObj[typedLetter].add(index);
          }
        });
      } else {
        const tile = document.querySelector(`#${letter}`) as HTMLInputElement;
        tile.classList.remove("gray-key");
        tile.classList.add("dark-key");
      }
    }

    // Step 3: Set Tile Colors Green then Yellow
    // I Only Care About the localCompletedSet To Check
    // Whether or not to add yellows
    const localGreenKeyboardSet = new Set<string>();
    const localCompletedSet = new Set<string>();
    for (let letter in greenObj) {
      let typedLetter = letter as LettersType;
      localGreenKeyboardSet.add(letter);

      if (mainObj[typedLetter].size == greenObj[typedLetter].size)
        localCompletedSet.add(typedLetter);

      greenObj[typedLetter].forEach((index) => {
        count++;
        const tile = document.querySelector(`#i${index}`) as HTMLInputElement;
        tile.classList.add("green");
      });
    }
    for (let letter in yellowObj) {
      let typedLetter = letter as LettersType;
      if (localCompletedSet.has(typedLetter)) continue;
      const yellowIterator = yellowObj[typedLetter].values();
      const index = yellowIterator.next().value;
      const tile = document.querySelector(`#i${index}`) as HTMLInputElement;
      tile.classList.add("yellow");
    }

    // Step 4: Set Keyboard
    localGreenKeyboardSet.forEach((letter) => {
      if (!keyboardGreenSet.has(letter)) {
        const tile = document.querySelector(`#${letter}`) as HTMLInputElement;
        tile.classList.remove("gray-key");
        tile.classList.remove("yellow-key");
        tile.classList.add("green-key");
      }
    });

    for (let letter in yellowObj) {
      const tile = document.querySelector(`#${letter}`) as HTMLInputElement;
      if (localGreenKeyboardSet.has(letter) || keyboardGreenSet.has(letter)) {
        tile.classList.remove("yellow-key");
      } else {
        tile.classList.remove("gray-key");
        tile.classList.add("yellow-key");
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

  const addLetter = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const { id } = e.currentTarget;
    if (tileIndex >= letterCount * currentRow) return;
    const tile = document.querySelector(`#i${tileIndex}`) as HTMLInputElement;
    tile.value = id;
    setTileIndex((p) => {
      return p + 1;
    });
  };

  const removeLetter = () => {
    if (tileIndex - 1 < (currentRow - 1) * letterCount) return;
    setTileIndex((p) => {
      const tile = document.querySelector(`#i${p - 1}`) as HTMLInputElement;
      tile.value = "";
      return p - 1;
    });
  };
  if (success !== null) {
    return (
      <main className="wordle-main">
        <section className="wordle-container">
          <h1>{success ? "You Won!" : "You Lost!"}</h1>
          <h2>The Word Was {currentWord}</h2>
          <button className="btn btn-outline-light" onClick={handleReset}>
            Play Again!
          </button>
        </section>
      </main>
    );
  }

  if (!letterChosen) {
    return (
      <main className="wordle-container">
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
