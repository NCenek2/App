import React from "react";
import "./Home.css";

const MainSection = ({ title, image, text1, text2 }) => {
  return (
    <React.Fragment>
      {
        <section className="main-section">
          <div className="main-section-container">
            <h2>{title}</h2>
            <p>{text1}</p>
            <p>{text2}</p>
            <img src={image} alt="" className="main-section-image"></img>
          </div>
        </section>
      }
    </React.Fragment>
  );
};

export default MainSection;
