import "./Header.css";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  return (
    <header className="header">
      <h1 onClick={() => navigate("/")}>My Portfolio</h1>
    </header>
  );
};

export default Header;
