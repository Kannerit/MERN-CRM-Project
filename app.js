const dotenv = require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const config = require("./config");
const cookieParser = require("cookie-parser");

const app = express();
app.use(express.json());

mongoose
  .connect("mongodb://localhost:27017/2-project-crm")
  .then(() => {
    console.log("connected to mongodb :) !");
  })
  .catch(() => {
    console.log("failed to connect");
  });

const userRouter = require("./app/routes/userRoutes");
const customerRouter = require('./app/routes/customerRoutes')
const actionRouter = require('./app/routes/actionRoutes')

app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.json());

/* Routes */
app.use("/", userRouter);
app.use('/customers', customerRouter)
app.use('/', actionRouter)


app.listen(config.app.port, () => {
  console.log("Server Express is running :) on port 3000 ");
});
