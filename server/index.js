// import express from "express";
// import morgan from "morgan";
const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
var LocalStorage = require("node-localstorage").LocalStorage;
var localStorage = new LocalStorage("./sessionData");
const cors = require("cors");
const sampleRoute = require("./routes/sample.routes");
const antibioticRoutes = require("./routes/antibiotics.routes");
const authRoutes = require("./routes/auth.routes");
const antibiogram = require("./routes/antibiogram.routes");
const db = require("./utils/database");
const User = require("./models/auth.model");
db.sync({
  force: false,
})
  .then(() => {
    User.findOne({ where: { username: "admin" } }).then(async (user) => {
      if (!user) {
        const defaultUser = await User.create({
          username: "admin",
          password: "admin",
          level: 0,
        });
        console.log("Default user created", defaultUser);
      }
    });
  })
  .catch((err) => console.log(err));

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use(morgan("dev"));

app.get("/", (req, res) => {
  return res.json({
    message: "Hello World",
  });
});

app.use("/sample", sampleRoute);
app.use("/antibiotic", antibioticRoutes);
app.use("/antibiogram", antibiogram);
app.use("/auth", authRoutes);

module.exports = app;
