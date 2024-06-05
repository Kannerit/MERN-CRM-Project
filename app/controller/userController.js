const User = require("../models/User");
const bcrypt = require("bcrypt");
const { hashPassword, comparePassword } = require("../helpers/auth");
const jwt = require("jsonwebtoken");


module.exports = {

  // Signup
  signup: async (req, res) => {
    try {
      const { username, email, password, confirmPassword } = req.body;

      if (!username) {
        return res.json({
          error: "Username is required",
        });
      }
      if (!password || password.length < 6) {
        return res.json({
          error:
            "Password is required and should be at least 6 characters long",
        });
      }

      if (password !== confirmPassword) {
        return res.json({
          error: "Password does not match",
        });
      }

      const existingUser = await User.findOne({ username, email });
      if (existingUser) {
        return res.json({
          error: "User already registered, please log in",
        });
      }

      const existingUserByEmail = await User.findOne({ email });
      if (existingUserByEmail) {
        return res.json({
          error: "Email already registered, please log in",
        });
      }

      const existingUserByName = await User.findOne({ username });
      if (existingUserByName) {
        return res.json({
          error: "Username is already taken, please create new username",
          field: "username",
        });
      }

      const hashedPassword = await hashPassword(password);
      const user = await User.create({
        username,
        email,
        password: hashedPassword,
      });

      return res.json(user);
    } catch (error) {
      console.error("Signup error:", error);
      res.status(500).json({ error: "Error occurred during signup" });
    }
  },

  //Login
  login: async (req, res) => {
    try {
      const { email, password } = req.body;

      const user = await User.findOne({ email });

      if (!user) {
        return res.status(400).json({
          error: "No user found with that email, please signup",
        });
      }
      const matchPassword = await comparePassword(password, user.password);

      if (!matchPassword) {
        return res.status(400).json({ error: "Incorrect password" });
      }
      if (matchPassword) {
        const token = jwt.sign({email: user.email, id: user._id, name: user.username}, process.env.JWT_SECRET, {expiresIn: "1h"})

        res.cookie("token", token, {
          httpOnly: true,
          sameSite: "Strict", 
          secure: process.env.NODE_ENV === "production",
        })
  
        console.log("cookie was set! :D");
        return res.status(200).json(user)
      }
 

    } catch (error) {
      console.log(error);
      res.status(500).json({
        error: "An error occurred during login backend",
      });
    }
  },

  getProfile: (req, res) => {
    console.log('Profile active');
    const { token } = req.cookies;
    console.log("Token from cookie", token);
    if (token) {
     jwt.verify(token, process.env.JWT_SECRET, async (err, decodedToken) => {
      if (err) {
        console.error("JWT verification err:", err)
        return res.status(401).json({error: "Invalid token"})
      }
      try {
        const user = await User.findById(decodedToken.id).select('-password');
        if(!user) {
          return res.status(404).json({error: "User not found"})
        }
        res.json(user)
      } catch (error) {
        console.error("Error fetching user:", error)
        res.status(500).json({error: "error fetching user"})
      }
     })
    } else {
      res.status(401).json({error: "no token found"})
    }
  },

  logout: (req, res) => {
    res.clearCookie("token");
    res.status(200).json({message: "Logged out succesfully"})
    res.redirect("/user/login");
  },
};
