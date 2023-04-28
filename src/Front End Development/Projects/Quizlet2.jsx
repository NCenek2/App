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

  React.useEffect(() => {
    const handleEnter = (event) => {
      if (event.key == "Enter" && checkValue == null) {
        event.preventDefault();
        handleCheck();
      }
      return;
    };

    if (mode.write && checkValue == null) {
      window.addEventListener("keypress", handleEnter);
    }
    return () => window.removeEventListener("keypress", handleEnter);
  }, [inputValue, checkValue]);

  React.useEffect(() => {
    const handleNext = (event) => {
      if (event.key == "Enter" && checkValue == true) {
        event.preventDefault();
        handleNextTerm();
      }
      return;
    };

    if (mode.write && isOverwritten) {
      window.addEventListener("keypress", handleNext);
    }
    return () => window.removeEventListener("keypress", handleNext);
  }, [inputValue, checkValue, isOverwritten]);

  React.useEffect(() => {
    const handleFalseKeyOverride = (event) => {
      if (event.key == "O" && checkValue == false) {
        event.preventDefault();
        handleOverwrite();
      }
      return;
    };
    if (mode.write) {
      window.addEventListener("keypress", handleFalseKeyOverride);
    }
    return () => window.removeEventListener("keypress", handleFalseKeyOverride);
  }, [inputValue, checkValue]);

  React.useEffect(() => {
    const handleFalseKeyNext = (event) => {
      console.log(event.key);
      if (event.key == "N" && checkValue == false) {
        event.preventDefault();
        handleNextTerm();
      }
      return;
    };

    if (mode.write) {
      window.addEventListener("keypress", handleFalseKeyNext);
    }
    return () => window.removeEventListener("keypress", handleFalseKeyNext);
  }, [inputValue, checkValue]);
  // End Keyboard Event
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
    matched = Array.from(mySet);
    return [mySet, matched];
  };
  const handleCheck = () => {
    if (inputValue.length <= 1) return;
    const [definitionSet, undefined] = createSet(data[index].definition);
    let [userSet, userArray] = createSet(inputValue);
    if ((!userSet && !userArray) || userSet.size < 1) return;
    let usedSet = new Set();
    let count = 0;
    // Currently overriding wrong data. no sum
    setWrongData((p) => {
      let output = [...p];
      if (definitionSet.size < 1) {
        setCheckValue((p) => true);
        return output;
      }
      for (let i = 0; i < userArray.length; i++) {
        if (definitionSet.has(userArray[i])) {
          console.log("HAS", userArray[i], count + 1);
          count++;
        }
        // Check verification status 60% or defintion size
      }
      if (count == definitionSet.size) {
        console.log("All Right!", count, userSet.size, definitionSet.size);
        setCheckValue((p) => true);
        setPlaceholder(
          (p) =>
            `Perfect!\nYours:\n${inputValue}\nActual:\n${data[index].definition}`
        );
        setInputValue((p) => "");
        return output;
      } else if (count >= Math.ceil(definitionSet.size * 0.6)) {
        setCheckValue((p) => true);
        setPlaceholder(
          (p) =>
            `Correct!\nYours:\n${inputValue}\nActual:\n${data[index].definition}`
        );
        setInputValue((p) => "");
        return output;
      } else {
        if (!wrongDataSet.has(data[index].term)) {
          // Add term to wrong set after failing check
          setWrongDataSet((p) => p.add(data[index].term));
          output.push(data[index]);
        }
        setCheckValue((p) => false);
        setPlaceholder(
          (p) => `Yours:\n${inputValue}\nActual:\n${data[index].definition}`
        );
        setInputValue((p) => "");
        return output;
      }
      // Handle display terms
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
        <div className="quizlet-front">
          <div className="quizlet-directions-container">
            <p className="quizlet-directions">
              Term and definition pairs should be written in the following
              format...
            </p>
            <p className="quizlet-directions">TERM: DEFINITION#</p>
            <p className="quizlet-directions">
              Make pairs as concise as possible. Terms and Definitions contain
              at least 2 or more consecutive letters. Do not use ":" except to
              seperate term and defintion For example,...
            </p>
            <p className="quizlet-directions">
              Median Value: Value at 1/2 of data length.#
            </p>
            <p className="quizlet-directions">
              For the write session, one letter words, patterns that do not have
              two consectuive letters, and common articles, prepositions, etc
              are not included.
            </p>
            <p className="quizlet-directions">
              Not Included: "the","an","at","so","is","are",
              "of","and","in","there", "("
            </p>
          </div>

          <div className="quizlet-data-container">
            <textarea
              name="droppedData"
              value={droppedData}
              onChange={(e) => setDroppedData(e.target.value)}
              className="droppedData"
            ></textarea>
            <button
              className="set-cards-btn btn btn-primary"
              onClick={() => handleData()}
            >
              Set Cards
            </button>
          </div>
        </div>
      </React.Fragment>
    );
  }

  if (finishedCards) {
    return (
      <React.Fragment>
        <div className="quizlet-finished-container">
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
      <div className="quizlet-container">
        <div className="quizlet-modes-container">
          <button
            className={`quizlet-btn btn btn${
              mode.flashcards ? "-light" : "-outline-light"
            }`}
            onClick={() => handleMode("flashcards")}
          >
            Flashcards
          </button>
          <button
            className={`quizlet-btn btn btn${
              mode.write ? "-light" : "-outline-light"
            }`}
            onClick={() => handleMode("write")}
          >
            Write
          </button>
        </div>
        {mode.flashcards && (
          <div className="flashcards-write-container">
            <div className="flashcards-info">
              <p className="term-definition">
                {showDefinition ? "Definition" : "Term"}
              </p>
              <p
                className={`flashcards-index ${
                  index == data.length - 1 && "last-index"
                }`}
              >
                {index + 1}/{data.length}
              </p>
            </div>
            <div className="flashcard" onClick={() => handleShow()}>
              <p className="flashcards-term-definition">
                {showDefinition ? data[index].definition : data[index].term}
              </p>
            </div>
            <div className="flashcards-btn-group">
              <button
                className="btn btn-primary quizlet-btn"
                onClick={() => handlePrevTerm()}
              >
                {"<-"}
              </button>
              <button
                className="btn btn-outline-light quizlet-btn"
                onClick={() => randomize()}
              >
                Randomize
              </button>
              <button
                className="btn btn-primary quizlet-btn"
                onClick={() => handleNextTerm()}
              >
                {"->"}
              </button>
            </div>
          </div>
        )}
        {mode.write && (
          <div className="flashcards-write-container">
            <div className="write-header">
              <div className="write-term-container">
                <span className="write-term">
                  {data[index].term.substring(0, 49).toUpperCase().slice(0, 1) +
                    data[index].term.substring(0, 49).slice(1, 50)}{" "}
                  {""}
                  <span
                    className={`${index == data.length - 1 && "last-index"}`}
                  >
                    {index + 1}/{data.length}
                  </span>
                </span>
              </div>

              <button
                className="btn btn-primary write-next-btn quizlet-btn"
                onClick={() => handleNextTerm()}
                disabled={checkValue == null && "true"}
              >
                {"->"}
              </button>
            </div>
            <textarea
              name="quizletInput"
              value={inputValue}
              onChange={(event) => handleInputValue(event)}
              className="flashcard"
              placeholder={
                checkValue != null ? `${placeholder}` : "Type the Definition"
              }
              disabled={checkValue != null && "true"}
            ></textarea>
            <button
              className={`quizlet-btn check-btn btn btn-${
                checkValue == true
                  ? "success"
                  : checkValue == false
                  ? "danger"
                  : "outline-light"
              }`}
              onClick={() => handleCheck()}
              disabled={checkValue != null && "true"}
            >
              Check
            </button>
            <button
              className="btn btn-outline-light quizlet-btn"
              onClick={() => handleOverwrite()}
              disabled={checkValue == null && "true"}
            >
              Overwrite
            </button>
          </div>
        )}
      </div>
    </React.Fragment>
  );
};

export default Quizlet;
