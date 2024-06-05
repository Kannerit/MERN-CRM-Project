import "./LoginForm.css";
import { useContext, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/userContext";

export default function Login() {
  const navigate = useNavigate();
  const { setUser, fetchUserProfile } = useContext(UserContext);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  //
  const loginUser = async (e) => {
    e.preventDefault();
    const { email, password } = formData;
    try {
      const res = await axios.post(
        "/login",
        { email, password },
        { withCredentials: true }
      );
      const resData = res.data;
      if (resData.error) {
        toast.error(resData.error);
      } else {
        setFormData({ email: "", password: "" });
        toast.success("login succesful!");
        setUser(resData);
        fetchUserProfile();
        navigate("/home");
        console.log("User was logged in");
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.error) {
        toast.error(error.response.data.error);
      } else {
        toast.error("An error occurred during login!");
      }
      console.error("An unexpected error during login:", error);
    }
  };
  return (
    <div className="form-container">
      <h1 className="login-header">Please Login</h1>
      <form className="login-form" onSubmit={loginUser}>
        <input
          className="login-input"
          type="email"
          name="email"
          placeholder="user@email.com"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />

        <input
          className="login-input"
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
        />

        <button type="submit" className="login-btn">
          Login
        </button>
        <button onClick={() => navigate("/")} className="login-btn">
          Cancel
        </button>
      </form>
    </div>
  );
}
