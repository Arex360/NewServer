//insertTempreture

/*
Used to enter weather data
realtime database

*/
const express = require("express");
const insert = require("../firebase/insertData");
const router = express.Router();
router.post("/insertTempreture", async (req, res) => {
  const { client, humidity, temperature, voltage, current } = req.body;
  const snapshot = insert(`/weather/${client}`, {
    humidity,
    temperature,
    voltage,
    current,
  });
  console.log(snapshot);
  console.log("added temp");
  res.send("done");
});
module.exports = router;
