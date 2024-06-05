import React, { useState, useEffect } from "react";
import "./Signup.css";
import axios from "axios";
import { Link, useNavigate, Navigate } from "react-router-dom";
import { toast } from "react-hot-toast";

const Signup = (props) => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });


  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("/signup", formData);
      const resData = res.data;
      if (resData.error) {
        console.log(resData.error);
        toast.error(resData.error);
      } else {
        setFormData({});
        toast.success("User created. Welcome!");
        navigate("/login");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="signUp">
      <h1 className="header-h1">Signup</h1>
      <form className="signup-form" onSubmit={handleSubmit}>
        <input
        className="signup-input"
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={(e) => setFormData({...formData, username: e.target.value})}
        />
        <input
          type="email"
          name="email"
          placeholder="user@email.com"
          value={formData.email}
          onChange={(e) => setFormData({...formData, email: e.target.value})}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={(e) => setFormData({...formData, password: e.target.value})}
        />
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={formData.confirmPassword}
          onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
        />
        <button type="submit" className="signup-btn">Signup</button>
        <button className="signup-btn" onClick={()=> navigate('/')}>Cancel</button>
      </form>
    </div>
  );
};

export default Signup;
