const express = require("express");
const router = express.Router();
const cors = require("cors");
const { test } = require("../controller/userController");

const userController = require("../controller/userController");

// middleware
router.use(
  cors({
    credentials: true,
    origin: "http://localhost:3001",
  })
);

//Signup Route
router.post("/signup", userController.signup);

//Login Route
router.post("/login", userController.login);

//Logout Route
router.post("/logout", userController.logout);

//Profile Route
router.get("/profile", userController.getProfile);

module.exports = router;
