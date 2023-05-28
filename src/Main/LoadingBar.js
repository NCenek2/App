import React from "react";
import "./LoadingBar.css";

const LoadingBar = ({ percentage, name }) => {
  return (
    <div className="loading-container-primary">
      <div className="loading-container-secondary">
        <h1 className="loading">Loading {name}</h1>
        <h2 className="percentage">{percentage}%</h2>
        <div className="outer-bar">
          <div className="inner-bar" style={{ width: `${percentage}%` }}></div>
        </div>
      </div>
    </div>
  );
};

export default LoadingBar;
