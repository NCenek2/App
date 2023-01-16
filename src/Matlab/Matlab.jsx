import React from "react";
import "./Matlab.css";
import Header from "../Main/Header";
import Main from "../Main/Main";
import sectionsData, { mainData } from "./MatlabData";

const Matlab = ({ showNav, toggleNav }) => {
  return (
    <React.Fragment>
      <Header showNav={showNav} toggleNav={toggleNav} />
      <Main sectionsData={sectionsData} mainData={mainData} />
    </React.Fragment>
  );
};

export default Matlab;
