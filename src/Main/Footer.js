import React from "react";
import "./Home.css";

const Footer = ({ githubURL }) => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="email">
          <p>Email</p>
          <p>ceneknicholas@gmail.com</p>
        </div>
        <div className="socials">
          <p>Social</p>
          <ul className="icons">
            <a
              href="https://www.linkedin.com/in/nicholas-cenek-91ba5b173"
              target="_blank"
            >
              <i className="fa fa-linkedin" aria-hidden="true"></i>
            </a>
            <a href={`${githubURL}`} target="_blank">
              <i className="fa fa-github-square" aria-hidden="true"></i>
            </a>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
