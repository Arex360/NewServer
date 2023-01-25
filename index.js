const express = require("express");
const cors = require("cors");
const cluster = require("cluster");
const cpus = require("os").cpus.length;
const process = require("process");
const bodyparser = require("body-parser");
const {
  postTrapImage,
  entry,
  getImage,
  postImage,
  addTrap,
  getTrap,
  insertTempreture,
  login,
  register,
  getWeatherData,
  trapEntry,
  validate,
  getTrapImage,
} = require("./routes/routes");
const { connection } = require("./service/connection");
let startServer = () => {
  const app = express();
  app.use(cors());
  app.use(bodyparser.urlencoded({ limit: "50mb", extended: true }));
  app.use(express.json({ limit: "50mb" }));
  app.use(bodyparser.json());
  app.use(postImage);
  app.use(getImage);
  app.use(addTrap);
  app.use(getTrap);
  app.use(entry);
  app.use(insertTempreture);
  app.use(login);
  app.use(register);
  app.use(getWeatherData);
  app.use(trapEntry);
  app.use(validate);
  app.use(postTrapImage);
  app.use(getTrapImage);
  //connection.connect()
  app.listen(5000, () => console.log("server started"));
};
startServer();
