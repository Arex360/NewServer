//insertTempreture
const express = require("express");
const insert = require("../firebase/insertData");
const router = express.Router();
router.post("/insertTempreture", async (req, res) => {
  const { client, humidity, tempreture, voltage, current } = req.body;
  const snapshot = insert(`/weather/${client}`, {
    humidity,
    tempreture,
    voltage,
    current,
  });
  console.log(snapshot);
  console.log("added temp");
  res.send("done");
});
module.exports = router;
