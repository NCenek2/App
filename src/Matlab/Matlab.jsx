import React from "react";
import Header from "../Main/Header";
import Main from "../Main/Main";
import sectionsData, { mainData } from "./MatlabData";

const Matlab = ({ showNav, toggleNav }) => {
  let githubURL = "https://github.com/NCenek2/Scripts/tree/main/Matlab";
  return (
    <React.Fragment>
      <Header showNav={showNav} toggleNav={toggleNav} />
      <Main
        sectionsData={sectionsData}
        mainData={mainData}
        githubURL={githubURL}
      />
    </React.Fragment>
  );
};

export default Matlab;
