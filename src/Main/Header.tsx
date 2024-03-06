import "./Home.css";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  return (
    <header className="header-outer">
      <div className="header-inner">
        <h1 onClick={() => navigate("/")}>My Portfolio</h1>
      </div>
    </header>
  );
};

export default Header;
