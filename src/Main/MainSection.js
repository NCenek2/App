import React from "react";
import "./Home.css";

const MainSection = ({ mainData }) => {
  const { title, text1, text2 } = mainData;
  return (
    <React.Fragment>
      {
        <section className="main-section">
          <div className="main-section-container">
            <h2>{title}</h2>
            <p>{text1}</p>
            <p>{text2}</p>
          </div>
        </section>
      }
    </React.Fragment>
  );
};

export default MainSection;
