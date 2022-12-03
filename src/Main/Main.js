import React from "react";
import "./Home.css";
import MainSection from "./MainSection";
import SubSections from "./SubSections";
import Footer from "./Footer";

const Main = ({ sectionsData, mainData, mainFooterIcons }) => {
  return (
    <main className="main">
      <MainSection {...mainData} />
      <SubSections sectionsData={sectionsData} />
      <Footer mainFooterIcons={mainFooterIcons} />
    </main>
  );
};

export default Main;
