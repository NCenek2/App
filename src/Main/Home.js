import React from "react";
import LoadingBar from "./LoadingBar";
import Header from "./Header";
import Main from "./Main";
import "./Home.css";
import sectionsData, { mainData } from "./mainData";
let githubURL = "https://github.com/NCenek2/NCenek2.github.io/tree/main/src";

const Home = ({ showNav, toggleNav, percentage, isLoading }) => {
  if (isLoading) {
    return <LoadingBar percentage={percentage} name={"Home"} />;
  }

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

export default Home;
