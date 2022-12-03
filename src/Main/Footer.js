import React from "react";
import "./Home.css";

const Footer = () => {
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
              <i class="fa fa-linkedin" aria-hidden="true"></i>
            </a>
            <a href="https://github.com/NCenek2/PythonScripts/tree/1d4253619df1cae3cee61246d3568ea577c534dd">
              <i class="fa fa-github-square" aria-hidden="true"></i>
            </a>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
