import React from "react";
import Header from "../Main/Header";
import Main from "../Main/Main";
import sectionsData, { mainData } from "./fullStackData";

const FullStack = ({ showNav, toggleNav }) => {
  let githubURL =
    "https://github.com/NCenek2/NCenek2.github.io/tree/main/src/Front%20End%20Development";
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

export default FullStack;
