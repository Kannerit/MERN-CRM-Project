import "./AppNav.css";
import { Link, useNavigate } from "react-router-dom";

const AppNav = () => {
  const navigate = useNavigate();
  return (
    <div className="mainNav">
      <h1></h1>

      <button className="appnav-btn" onClick={() => navigate("/login")}>Login</button>
      <button className="appnav-btn" onClick={() => navigate("/signup")}>Signup</button>
    </div>
  );
};

export default AppNav;
