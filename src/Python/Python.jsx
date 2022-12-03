import React from "react";
import "./Python.css";
import Header from "../Main/Header";
import Main from "../Main/Main";
import sectionsData, { mainData } from "./pythonData";

const Python = ({ showNav, toggleNav }) => {
  return (
    <React.Fragment>
      <Header showNav={showNav} toggleNav={toggleNav} />
      <Main sectionsData={sectionsData} mainData={mainData} />
    </React.Fragment>
  );
};

export default Python;
