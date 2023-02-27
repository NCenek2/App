import React from "react";
import "./Quizlet.css";

const Quizlet = () => {
  // droppedData is string of data inputed in beginning to create
  // an array of Object containing data
  const [droppedData, setDroppedData] = React.useState("");
  // After a successful data conversion, dataProcess will be set to true
  const [dataProcess, setDataProcess] = React.useState(false);

  // Index keeps index of the card
  const [index, setIndex] = React.useState(0);
  // Data is an object of notecard data
  const [data, setData] = React.useState();
  // showDefinition toggles between term and defintion when flipped
  const [showDefinition, setShowDefinition] = React.useState(false);
  const [inputValue, setInputValue] = React.useState("");

  // Checks Inputed Valve to Display Button as Green or Red
  const [checkValue, setCheckValue] = React.useState(null);
  // Holds the wrong data after incorrect answers
  const [wrongData, setWrongData] = React.useState([]);
  // Houses incorrect definition terms
  const [wrongDataSet, setWrongDataSet] = React.useState(new Set());
  const [finishedCards, setFinishedCards] = React.useState(false);

  const handleData = () => {
    // Checks if cards can be made. Anything check, # and : check
    if (!droppedData || !/#/gi.test(droppedData) || !/:/gi.test(droppedData)) {
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
  };

  const handleShow = () => {
    // Toggles Term and Definition
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
      setShowDefinition((p) => false);
      setIndex((p) => 0);
      setInputValue("");
      setCheckValue(null);
      return previousData;
    });
  };

  const handleReset = () => {
    //
    setShowDefinition((p) => false);
    setInputValue("");
    setCheckValue(null);
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
        return 0;
      }
      handleReset();
      return p + 1;
    });
  };

  const createSet = (string) => {
    // replaced creates a string without parenthesis ()
    let replaced = string.replace(/ *\([^)]*\) */g, " ");
    // parenthesis gathers parenthesis data
    let parenthesis = string.match(/ *\([^)]*\) */g);
    // Collapses parenthesis data (50% - 60%) becomes (50%-60%)
    for (let index in parenthesis) {
      parenthesis[index] = parenthesis[index].split(" ").join("");
    }

    // Creates the total definition array
    let matched = parenthesis
      ? replaced.match(/[^\(\s\,\.][a-z-]*[^\)\s,\.]/gi).concat(parenthesis)
      : replaced.match(/[^\(\s\,\.][a-z-]*[^\)\s,\.]/gi);
    let mySet = new Set();
    let unWanted = new Set([
      "the",
      "a",
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
      if (!unWanted.has(item)) mySet.add(item);
    }
    return [mySet, matched];
  };
  const handleCheck = () => {
    if (inputValue == "") return;

    const [definitionSet, undefined] = createSet(data[index].definition);
    let userArray = createSet(inputValue)[1];
    let count = 0;
    let usedSet = new Set();
    // Currently overriding wrong data. no sum
    setWrongData((p) => {
      let output = [...p];
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
      return output;
    });
  };
  if (!dataProcess) {
    return (
      <React.Fragment>
        <div className="quizlet-body">
          <p className="quizlet-directions">
            Term and definition pairs should be written in the following format
            with numeric values in parenthesis.
          </p>
          <p className="quizlet-directions">TERM: DEFINITION#</p>
          <p className="quizlet-directions">
            Make pairs as concise as possible. For example,...
          </p>
          <p className="quizlet-directions">
            Median Value: Value at (1/2) of data length. Average of two middle
            values, if even#
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
        </div>
      </React.Fragment>
    );
  }

  return (
    <React.Fragment>
      <div className="quizlet-body">
        <div
          className={`quizlet-words ${showDefinition && "term definition"}`}
          onClick={() => handleShow()}
        >
          <p className={`card-identifier ${showDefinition && "definition"}`}>
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
          <button className="btn btn-primary" onClick={() => handlePrevTerm()}>
            {"<-"}
          </button>
          <button className="btn btn-primary" onClick={() => handleNextTerm()}>
            {"->"}
          </button>
        </div>
        <br />
        <button className="btn btn-outline-light" onClick={() => randomize()}>
          Randomize
        </button>
        <h3>{index}</h3>
        <textarea
          name="quizletInput"
          value={inputValue}
          onChange={(event) => setInputValue(event.target.value)}
          className="quizletInput"
        ></textarea>
        <button
          className={`btn btn-${
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
        {/* {split.map((item) => (
          <p>{item}</p>
        ))} */}
        {/* <p>{inputValue}</p> */}
      </div>
    </React.Fragment>
  );
};

export default Quizlet;
