const entry = require("./entry");
const getImage = require("./getImage");
const postImage = require("./postImage");
const addTrap = require("./addTrap");
const getTrap = require("./getTraps");
const insertTempreture = require("./insertTempreture");
const login = require("./login");
const register = require("./register");
const getWeatherData = require("./getTemp");
const trapEntry = require("./entryOfTrap");
const validate = require("./validateTrap");
const postTrapImage = require("./postTrapImage");
const getTrapImage = require("./getTrapImage");
const getUserProfile = require('./getUserProfile')
module.exports = {
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
  getUserProfile
};
