import React, { useContext } from "react";
import { FaArrowCircleRight } from "react-icons/fa";
import QuizletContext from "./QuizletProvider";

const Write = () => {
  const { decks, currentDeckId, exitSession } = useContext(QuizletContext);

  // an array of Object containing data
  const [data, setData] = React.useState(decks[currentDeckId].cards);

  // Index keeps index of the card
  const [index, setIndex] = React.useState(0);
  // showDefinition toggles between term and defintion when flipped
  const [inputValue, setInputValue] = React.useState("");
  const [placeholder, setPlaceholder] = React.useState("");

  // Checks Inputed Valve to Display Button as Green or Red
  const [checkValue, setCheckValue] = React.useState(null);
  // Holds the wrong data after incorrect answers
  const [wrongData, setWrongData] = React.useState([]);
  // Houses incorrect definition terms
  const [wrongDataSet, setWrongDataSet] = React.useState(new Set());
  // Handles Overwritten Feature
  const [isOverwritten, setIsOverwritten] = React.useState(false);

  React.useEffect(() => {
    const handleTab = (e) => {
      if (e.key === "Tab") e.preventDefault();
    };
    document.addEventListener("keydown", handleTab);
    return () => document.removeEventListener("keydown", handleTab);
  }, []);

  const handleCardOverwrite = () => {
    setWrongData((previousWrongData) =>
      previousWrongData.filter(
        (prevWrongValue) => prevWrongValue.term != data[index].term
      )
    );

    setCheckValue(true);
    setInputValue("");
    setIsOverwritten(true);
    setPlaceholder(`Overwritten to ${data[index].definition}`);
  };

  const handleInputValue = (e) => {
    const { value } = e.target;
    setPlaceholder("Type the Definition");
    setInputValue(value);
  };

  const handleCardReset = () => {
    setInputValue("");
    setCheckValue(null);
    setIsOverwritten(false);
    setPlaceholder("");
  };

  const handleNextTerm = () => {
    if (wrongData.length === 0 && index + 1 >= data.length)
      return exitSession();
    setIndex((prevIndex) => {
      if (prevIndex + 1 >= data.length) {
        setData(() => {
          handleCardReset();
          setWrongDataSet(new Set());
          return wrongData;
        });
        setWrongData([]);
        return 0;
      }
      handleCardReset();
      return prevIndex + 1;
    });
  };

  const createSet = (string) => {
    // Spliting string into lowercase array of words, taking out
    // spaces, commas, and periods.
    let matched = string.toLowerCase().split(/[.,\s]+/gi);
    if (!matched) return [null, null];

    let mySet = new Set();
    let unWanted = new Set([
      "the",
      "an",
      "at",
      "so",
      "is",
      "are",
      "of",
      "and",
      "in",
      "there",
    ]);

    for (let item of matched) {
      if (!unWanted.has(item) && item.length > 1) mySet.add(item);
    }

    return mySet;
  };
  const handleCheck = () => {
    if (inputValue.length <= 1) return;
    const definitionSet = createSet(data[index].definition);
    let userSet = createSet(inputValue);
    if (!userSet || userSet.size < 1) return;
    let count = 0;

    setWrongData((p) => {
      let output = [...p];

      userSet.forEach((word) => {
        if (definitionSet.has(word)) count++;
      });

      setInputValue("");
      if (definitionSet.size < 1) {
        setCheckValue(true);
        setPlaceholder("Correct!");
        return output;
      } else if (count == definitionSet.size) {
        setCheckValue(true);
        setPlaceholder(
          `Perfect!\nYours:\n${inputValue}\nActual:\n${data[index].definition}`
        );
      } else if (count >= Math.ceil(definitionSet.size * 0.6)) {
        setCheckValue(true);
        setPlaceholder(
          `Correct!\nYours:\n${inputValue}\nActual:\n${data[index].definition}`
        );
      } else {
        if (!wrongDataSet.has(data[index].term)) {
          // Add term to wrong set after failing check
          setWrongDataSet((p) => p.add(data[index].term));
          output.push(data[index]);
        }
        setCheckValue(false);
        setPlaceholder(
          `Yours:\n${inputValue}\nActual:\n${data[index].definition}`
        );
      }
      return output;
    });
  };
  return (
    <section className="write-container">
      <h1 className="write-title">Write</h1>
      <button
        className="btn section-color"
        onClick={() => exitSession(currentDeckId)}
      >
        Home
      </button>
      <div className="write-count-term-container">
        <p className={`${index == data.length - 1 && "last-index"}`}>
          {index + 1}/{data.length}
        </p>
        <h3>
          {data[index].term.substring(0, 49).toUpperCase().slice(0, 1) +
            data[index].term.substring(0, 49).slice(1, 50)}{" "}
        </h3>
      </div>
      <button
        className="btn btn-primary "
        onClick={handleNextTerm}
        disabled={checkValue == null && "true"}
      >
        <FaArrowCircleRight />
      </button>
      <textarea
        value={inputValue}
        onChange={handleInputValue}
        className={`write-textarea ${checkValue != null && "pointer-events"}`}
        placeholder={
          checkValue != null ? `${placeholder}` : "Type the Definition"
        }
      ></textarea>
      <div className="write-btn-container">
        <button
          className={`btn btn-${
            checkValue == true
              ? "success pointer-events"
              : checkValue == false
              ? "danger"
              : "outline-light"
          } write-btn`}
          onClick={handleCheck}
        >
          Check
        </button>
        <button
          className={`btn btn-outline-light write-btn ${
            (checkValue == null || checkValue == true) && "pointer-events"
          }`}
          onClick={handleCardOverwrite}
          disabled={checkValue == null && "true"}
        >
          Overwrite
        </button>
      </div>
    </section>
  );
};

export default Write;
