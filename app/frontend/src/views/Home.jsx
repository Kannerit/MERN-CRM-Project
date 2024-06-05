import "./Home.css";
import { useContext } from "react";
import { UserContext } from "../context/userContext";
import { Link, useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  const { user, logout } = useContext(UserContext);
  
  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };


  return (
    <div className="home-page">
      {!!user && <h1 className="name-header">Hi {user.username}!</h1>}
      <h1 className="home-header">Welcome Back :)</h1>
      <button className="home-btn" onClick={() => navigate("/customers")}>
        Go to Customer List
      </button>
      <button className="home-btn" onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default Home;
