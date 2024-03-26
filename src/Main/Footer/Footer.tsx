import "./Footer.css";

type FooterProps = {
  githubURL: string;
};

const Footer = ({ githubURL }: FooterProps) => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="email">
          <p>Email</p>
          <p>ceneknicholas@gmail.com</p>
        </div>
        <div className="socials">
          <p>Social</p>
          <div className="icons">
            <a
              href="https://www.linkedin.com/in/nicholas-cenek-91ba5b173"
              target="_blank"
              rel="noreferrer"
              className="fa fa-linkedin"
            ></a>
            <a
              href={`${githubURL}`}
              target="_blank"
              rel="noreferrer"
              className="fa fa-github-square"
            ></a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
