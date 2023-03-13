import React from "react";
import "./Quizlet.css";

const Quizlet = () => {
  // droppedData is string of data inputed in beginning to create
  // an array of Object containing data
  const [droppedData, setDroppedData] = React.useState("");
  // After a successful data conversion, dataProcess will be set to true
  const [dataProcess, setDataProcess] = React.useState(false);
  // Data is an object of notecard data
  const [fixedData, setFixedData] = React.useState();
  const [data, setData] = React.useState();

  // Index keeps index of the card
  const [index, setIndex] = React.useState(0);
  // showDefinition toggles between term and defintion when flipped
  const [showDefinition, setShowDefinition] = React.useState(false);
  const [inputValue, setInputValue] = React.useState("");
  const [placeholder, setPlaceholder] = React.useState("");

  // Checks Inputed Valve to Display Button as Green or Red
  const [checkValue, setCheckValue] = React.useState(null);
  // Holds the wrong data after incorrect answers
  const [wrongData, setWrongData] = React.useState([]);
  // Houses incorrect definition terms
  const [wrongDataSet, setWrongDataSet] = React.useState(new Set());
  const [finishedCards, setFinishedCards] = React.useState(false);
  // Handles Overwritten Feature
  const [isOverwritten, setIsOverwritten] = React.useState(false);

  // Mode Handling
  const [mode, setMode] = React.useState({
    flashcards: true,
    write: false,
  });

  const handleData = () => {
    // Checks if cards can be made. Anything check, # and : check
    if (!droppedData || !/.*[a-z]{2,}.*:.*[a-z]{2,}.*#/gi.test(droppedData)) {
      return;
    }

    // Splits String into seperate term-definition combos
    // For whatever reason, output string always has an empty
    // string in the last position. Therefore, a check to remove.
    let splitString = droppedData.split(/[\s\.\n]*#[\s\.\n]*/gi);
    if (splitString[splitString.length - 1] == "") splitString.pop();

    // Creates Obj of terms and definitions
    let myObj = [];
    for (let i = 0; i < splitString.length; i++) {
      let [term, definition] = splitString[i].split(":");
      term = term.trim();
      definition = definition.trim();
      myObj.push({
        term: term,
        definition: definition,
      });
    }
    setDataProcess((p) => true);
    setData((p) => myObj);
    randomize();
    setFixedData((p) => myObj);
  };

  const handleShow = () => {
    setShowDefinition((past) => !past);
  };

  const randomize = () => {
    setData((previousData) => {
      for (let i = 0; i < previousData.length; i++) {
        let temp = previousData[i];
        let randomIndex = Math.floor(Math.random() * previousData.length);
        previousData[i] = previousData[randomIndex];
        previousData[randomIndex] = temp;
      }
      setIndex((p) => 0);
      handleReset();
      return previousData;
    });
  };

  const handleReset = () => {
    //
    setShowDefinition((p) => false);
    setInputValue((p) => "");
    setCheckValue((p) => null);
    setIsOverwritten((p) => false);
    setPlaceholder((p) => "");
  };

  const handlePrevTerm = () => {
    setIndex((p) => {
      if (p - 1 < 0) {
        handleReset();
        return p;
      }
      handleReset();
      return p - 1;
    });
  };

  const handleNextTerm = () => {
    setIndex((p) => {
      if (p + 1 >= data.length) {
        if (mode.write) {
          setData((p) => {
            if (wrongData.length <= 0) {
              setFinishedCards((p) => true);
              return;
            }
            handleReset();
            setWrongDataSet((p) => new Set());
            return wrongData;
          });
          setWrongData([]);
        } else {
          setData((p) => fixedData);
          randomize();
        }
        return 0;
      }
      handleReset();
      return p + 1;
    });
  };

  const createSet = (string) => {
    // replaced creates a string without parenthesis ()

    let matched = string.toLowerCase().split(/[.,\s]+/gi);
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
    if (!matched) return [null, null];
    for (let item of matched) {
      if (!unWanted.has(item) && item.length > 1) mySet.add(item);
    }
    return [mySet, matched];
  };
  const handleCheck = () => {
    if (inputValue.length <= 1) return;

    const [definitionSet, undefined] = createSet(data[index].definition);
    let [userSet, userArray] = createSet(inputValue);
    if ((!userSet && !userArray) || userSet.size < 1) return;
    console.log("---------");
    console.log(definitionSet, "def set");
    console.log(userSet, "user set");
    let count = 0;
    let usedSet = new Set();
    // Currently overriding wrong data. no sum
    setWrongData((p) => {
      let output = [...p];
      if (definitionSet.size < 1) {
        setCheckValue((p) => true);
        return output;
      }
      for (let i = 0; i < userArray.length; i++) {
        if (definitionSet.has(userArray[i]) && !usedSet.has(userArray[i])) {
          usedSet.add(userArray[i]);
          count++;
        }
        // Check verification status 30% or defintion size
        if (
          count > Math.ceil(definitionSet.size * 0.3) ||
          count == definitionSet.size
        ) {
          setCheckValue((p) => true);
          return output;
        }
      }
      // Add term to wrong set after failing check
      if (!wrongDataSet.has(data[index].term)) {
        setWrongDataSet((p) => p.add(data[index].term));
        output.push(data[index]);
      }
      setCheckValue((p) => false);
      setPlaceholder(
        (p) => `Yours:\n${inputValue}\nActual:\n${data[index].definition}`
      );
      setInputValue((p) => "");
      return output;
    });
  };

  const handleOverwrite = () => {
    wrongDataSet.delete(data[index].term);
    setWrongData((previousWrongData) =>
      previousWrongData.filter(
        (prevWrongValue) => prevWrongValue.term != data[index].term
      )
    );
    setCheckValue((prevCheckValue) => true);
    setInputValue((p) => "");
    setIsOverwritten((p) => true);
    setPlaceholder((p) => `Overwritten to ${data[index].definition}`);
  };
  const handleMode = (mode) => {
    if (mode == "flashcards") {
      setMode((prevMode) => {
        if (!prevMode.flashcards) {
          setData((p) => fixedData);
          randomize();
        }
        return { write: false, flashcards: true };
      });
    } else if (mode == "write") {
      setMode((prevMode) => {
        if (!prevMode.write) {
          setData((p) => fixedData);
          randomize();
        }
        return { write: true, flashcards: false };
      });
    } else {
      return;
    }
  };

  const handleInputValue = (event) => {
    setPlaceholder((p) => "Type the Definition");
    setInputValue(event.target.value);
  };

  const handleFinish = () => {
    setMode((prevMode) => {
      return { write: false, flashcards: true };
    });
    setData((p) => fixedData);
    randomize();
    setFinishedCards((p) => false);
  };

  if (!dataProcess) {
    return (
      <React.Fragment>
        <div className="quizlet-body quizlet-front">
          <p className="quizlet-directions">
            Term and definition pairs should be written in the following
            format...
          </p>
          <p className="quizlet-directions">TERM: DEFINITION#</p>
          <p className="quizlet-directions">
            Make pairs as concise as possible. Terms and Definitions contain at
            least 2 or more consecutive letters. Do not use ":" except to
            seperate term and defintion For example,...
          </p>
          <p className="quizlet-directions">
            Median Value: Value at 1/2 of data length.#
          </p>
          <p className="quizlet-directions">
            For the write session, one letter words, patterns that do not have
            two consectuive letters, and common articles, prepositions, etc are
            not included.
          </p>
          <p className="quizlet-directions">
            Not Included: "the","an","at","so","is","are",
            "of","and","in","there", "("
          </p>
          <textarea
            name="droppedData"
            value={droppedData}
            onChange={(e) => setDroppedData(e.target.value)}
            className="droppedData"
          ></textarea>
          <button className="btn btn-primary" onClick={() => handleData()}>
            Set Cards
          </button>
        </div>
      </React.Fragment>
    );
  }

  if (finishedCards) {
    return (
      <React.Fragment>
        <div className="quizlet-body">
          <h1 className="quizlet-finished">You're Done!</h1>
          <button className="btn btn-light" onClick={() => handleFinish()}>
            Go Back!
          </button>
        </div>
      </React.Fragment>
    );
  }

  return (
    <React.Fragment>
      <div className="quizlet-body">
        <div className="quizlet-modes">
          <button
            className={`btn btn${
              mode.flashcards ? "-light" : "-outline-light"
            }`}
            onClick={() => handleMode("flashcards")}
          >
            Flashcards
          </button>
          <button
            className={`btn btn${mode.write ? "-light" : "-outline-light"}`}
            onClick={() => handleMode("write")}
          >
            Write
          </button>
        </div>
        {mode.flashcards && (
          <React.Fragment>
            <div
              className={`quizlet-words ${showDefinition && "term definition"}`}
              onClick={() => handleShow()}
            >
              <p
                className={`card-identifier ${showDefinition && "definition"}`}
              >
                {showDefinition ? "Definition" : "Term"}
              </p>
              <p
                className={`quizlet-index ${
                  index == data.length - 1 && "last-index"
                } ${showDefinition && "definition"}`}
              >
                {index + 1}/{data.length}
              </p>
              {!showDefinition && <p>{data[index].term}</p>}
              {showDefinition && (
                <p className="definition">{data[index].definition}</p>
              )}
            </div>
            <div className="quizlet-btn-group">
              <button
                className="btn btn-primary"
                onClick={() => handlePrevTerm()}
              >
                {"<-"}
              </button>
              <button
                className="btn btn-outline-light"
                onClick={() => randomize()}
              >
                Randomize
              </button>
              <button
                className="btn btn-primary"
                onClick={() => handleNextTerm()}
              >
                {"->"}
              </button>
            </div>
          </React.Fragment>
        )}
        {mode.write && (
          <div className="quizlet-write-container">
            <div className="write-term-btn">
              <span className="write-term">
                {data[index].term} {""}
                <span className={`${index == data.length - 1 && "last-index"}`}>
                  {index + 1}/{data.length}
                </span>
              </span>
              {checkValue !== null && (
                <button
                  className="btn btn-primary btn-sm"
                  onClick={() => handleNextTerm()}
                >
                  {"->"}
                </button>
              )}
            </div>
            <textarea
              name="quizletInput"
              value={inputValue}
              onChange={(event) => handleInputValue(event)}
              className="quizletInput"
              placeholder={
                checkValue == false || isOverwritten
                  ? `${placeholder}`
                  : "Type the Definition"
              }
            ></textarea>
            <button
              className={`check-btn btn btn-${
                checkValue == true
                  ? "success"
                  : checkValue == false
                  ? "danger"
                  : "outline-light"
              }`}
              onClick={() => handleCheck()}
            >
              Check
            </button>
            {checkValue == false && (
              <button
                className="btn btn-outline-light"
                onClick={() => handleOverwrite()}
              >
                Overwrite
              </button>
            )}
          </div>
        )}
      </div>
    </React.Fragment>
  );
};

export default Quizlet;
