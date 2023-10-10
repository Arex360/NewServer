/*

Posting the image, the first copy is sent to server



*/
const express = require("express");
const crypto = require("crypto");
const query = require("../service/query");
const fs = require("fs");
const router = express.Router();
const base64ToImage = require("base64-to-image");
const axios = require("axios");
const path = require('path')
router.post("/postImage/:client", async (req, res) => {
  let url = req.body.base64;
  let filename = "";
  let {client} = req.params
  let log = new Date().toString() + "received image" +"\n"
  fs.appendFile(client+'.txt', log, (err) => {
    if (err) throw err;
    console.log('Request logged');
  });
  // Create a unique filename
  filename = require("crypto")
    .createHash("sha256")
    .update(url)
    .digest("hex")
    .toString();
  filename = filename.substring(0, 8);
  let id = req.body.id;
  let output = filename + "out";
  filename = "images/" + filename + ".png";
  // Decode the base64 encoded image data
  let binaryData = Buffer.from(url, "base64");
  // Check if the file size is greater than 100KB
  // 100000
  if (binaryData.length > 100) {
    fs.writeFileSync(filename, binaryData);
    const absPath =path.resolve(filename)
    console.log(absPath)
    let res = await axios.get(`http://127.0.0.1:5000/getmodel/${client}`)
    res = res.data
    res = res.modelID
    console.log(`printing model : ${res}`)
    axios.post("http://127.0.0.1:80", { path: absPath, client , model:res});
  }
  const date = Date.now()/1000
  console.log("getting date")
  let data = ""
  if(client != "date")
     data = await axios.get(`http://localhost:5000/Adddetection/${client}/date/${date}`)
  console.log(date)
  res.send("done");
});
module.exports = router;

/*
const express = require("express");
const crypto = require("crypto");
const query = require("../service/query");
const fs = require("fs");
const router = express.Router();
const base64ToImage = require("base64-to-image");
const axios = require("axios");
const path = require('path')
router.post("/postImage", (req, res) => {
  let url = req.body.base64;
  let filename = "";
  let client = req.body.client;
  // Create a unique filename
  filename = require("crypto")
    .createHash("sha256")
    .update(url+new Date().toString())
    .digest("hex")
    .toString();
  filename = filename.substring(0, 8);
  let id = req.body.id;
  let output = filename + "out";
  filename = "images/" + filename + ".png";
  // Decode the base64 encoded image data
  let binaryData = Buffer.from(url, "base64");
  fs.writeFileSync(filename, binaryData);
  const absPath =path.resolve(filename)
  console.log(absPath)
  axios.post("http://localhost:80", { path: absPath,client });
  res.send("done");
});
module.exports = router;
*/