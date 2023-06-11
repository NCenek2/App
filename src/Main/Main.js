import React from "react";
import "./Home.css";
import MainSection from "./MainSection";
import SubSections from "./SubSections";
import Footer from "./Footer";

const Main = ({ sectionsData, mainData, mainFooterIcons, githubURL }) => {
  return (
    <main className="main">
      <MainSection mainData={mainData} />
      <SubSections sectionsData={sectionsData} />
      <Footer mainFooterIcons={mainFooterIcons} githubURL={githubURL} />
    </main>
  );
};

export default Main;
