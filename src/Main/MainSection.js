import React from "react";
import "./Home.css";

const MainSection = ({ mainData }) => {
  const { title, image, text1, text2 } = mainData;
  return (
    <React.Fragment>
      {
        <section className="main-section">
          <div className="main-section-container">
            <h2>{title}</h2>
            <p>{text1}</p>
            <p>{text2}</p>
            <img src={image} alt=""></img>
          </div>
        </section>
      }
    </React.Fragment>
  );
};

export default MainSection;
