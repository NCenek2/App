import React from "react";
import LoadingBar from "./LoadingBar";
import Header from "./Header";
import Main from "./Main";
import "./Home.css";
import sectionsData, { mainData } from "./mainData";

const Home = ({ showNav, toggleNav, percentage, isLoading }) => {
  if (isLoading) {
    return <LoadingBar percentage={percentage} name={"Home"} color={"red"} />;
  }

  return (
    <React.Fragment>
      <Header showNav={showNav} toggleNav={toggleNav} />
      <Main sectionsData={sectionsData} mainData={mainData} />
    </React.Fragment>
  );
};

export default Home;
