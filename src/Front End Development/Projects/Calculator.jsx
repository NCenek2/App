import React, { useState } from "react";
import "./Calculator.css";

const Calculator = () => {
  const [topString, setTopString] = useState("0");
  const [bottomString, setBottomString] = useState("0");

  const resetAC = () => {
    setBottomString(0);
    setTopString("0");
    console.clear();
  };

  const onSymbol = (event) => {
    const name = event.target.name;
    console.log(topString, "OUTSIDE TOPSTRING");
    let dumbString = topString + name;
    console.log(dumbString, "OUTSIDE DUMBSTRING");
    if (/[*+/-][-][*+/-]/.test(dumbString)) {
      dumbString = dumbString.split("");
      console.log(dumbString, "SPLIT");
      dumbString.splice(dumbString.length - 3, 2);
      console.log(dumbString, "SPLICE");
      dumbString = dumbString.join("");
      console.log(dumbString, "JOINED");
      setBottomString(name);
      setTopString(dumbString);
    } else if (/[*+/-][*+/]/.test(dumbString)) {
      console.log("option b");
      dumbString = dumbString.split("");
      dumbString.splice(dumbString.length - 2, 1);
      dumbString = dumbString.join("");
      setBottomString(name);
      setTopString(dumbString);
    } else {
      console.log("elss case");
      setBottomString(name);
      updateScreen(name);
    }
  };

  const updateScreen = (name) => {
    setTopString(topString + name);
  };

  const onDecimal = (event) => {
    const name = event.target.name;

    if (/[\d]+/.test(bottomString)) {
      console.log("after digit");
      if (/[.]/.test(bottomString)) {
        console.log("dot already here");
      } else {
        setBottomString(bottomString + name);
        updateScreen(name);
      }
    } else {
      updateScreen(name);
      setBottomString(name);
    }
  };
  const onNumber = (event) => {
    const name = event.target.name;
    if (bottomString === "0" && topString === "0") {
      setTopString(name);
      setBottomString(name);
    } else if (/[*-+/]/.test(bottomString)) {
      updateScreen(name);
      setBottomString(name);
    } else {
      updateScreen(name);
      setBottomString(bottomString + name);
    }
  };

  const onEqual = () => {
    const number = eval(topString);
    setTopString(number);
    setBottomString(number);
    console.log(bottomString);
    console.log(topString);
  };

  return (
    <React.Fragment>
      <div className="calculator-container">
        <span className="calculator-header">
          <span className="calculator-display">{topString}</span>
          <span className="calculator-display">{bottomString}</span>
        </span>
        <button className="calculator-button" onClick={resetAC} name="AC">
          <p>AC</p>
        </button>
        <button className="calculator-button" onClick={onSymbol} name="/">
          <p>/</p>
        </button>
        <button className="calculator-button" onClick={onSymbol} name="*">
          <p>X</p>
        </button>
        <button className="calculator-button" onClick={onNumber} name="7">
          <p>7</p>
        </button>
        <button className="calculator-button" onClick={onNumber} name="8">
          <p>8</p>
        </button>
        <button className="calculator-button" onClick={onNumber} name="9">
          <p>9</p>
        </button>
        <button className="calculator-button" onClick={onSymbol} name="-">
          <p>-</p>
        </button>
        <button className="calculator-button" onClick={onNumber} name="4">
          <p>4</p>
        </button>
        <button className="calculator-button" onClick={onNumber} name="5">
          <p>5</p>
        </button>
        <button className="calculator-button" onClick={onNumber} name="6">
          <p>6</p>
        </button>
        <button className="calculator-button" onClick={onSymbol} name="+">
          <p>+</p>
        </button>
        <button className="calculator-button" onClick={onNumber} name="1">
          <p>1</p>
        </button>
        <button className="calculator-button" onClick={onNumber} name="2">
          <p>2</p>
        </button>
        <button className="calculator-button" onClick={onNumber} name="3">
          <p>3</p>
        </button>
        <button className="calculator-button" onClick={onEqual} name="=">
          <p>=</p>
        </button>
        <button className="calculator-button" onClick={onNumber} name="0">
          <p>0</p>
        </button>
        <button className="calculator-button" onClick={onDecimal} name=".">
          <p>.</p>
        </button>
      </div>
    </React.Fragment>
  );
};

export default Calculator;
