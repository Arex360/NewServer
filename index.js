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
  getUserProfile,
} = require("./routes/routes");
const { connection } = require("./service/connection");
let startServer = () => {
  const app = express();
  app.use(cors());
  app.use(bodyparser.urlencoded({ limit: "50mb", extended: true }));
  app.use(express.json({ limit: "50mb" }));
  app.use(bodyparser.json());
  app.use(postImage); // image sent by the Trap {base64,client}
  app.use(getImage); // deprecated
  app.use(addTrap); // adding trap to email  {email,trapID}
  app.use(getTrap); // deprecated 
  app.use(entry); // status
  app.use(insertTempreture); // insert Image data { client, humidity, temperature, voltage, current } 
  app.use(login); // used to login user {email,password,name}
  app.use(register); // used to register user {email,password,name}
  app.use(getWeatherData); // get Trap environment  {trapID}
  app.use(trapEntry); // Profile up the trap {trapID} 
  app.use(validate); // validate the trap {trapID} 
  app.use(postTrapImage); // Inter server trap image post { trapID, path }
  app.use(getTrapImage); // Get image of trap { trapID }
  app.use(getUserProfile) // Get user profile | GET 
  //connection.connect()
  app.listen(5000, () => console.log("server started"));
};
startServer();
