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
router.post("/postImage", (req, res) => {
  let url = req.body.base64;
  let filename = "";
  let client = req.body.client;
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
  fs.writeFileSync(filename, binaryData);
  const absPath =path.resolve(filename)
  console.log(absPath)
  axios.post("http://localhost:80", { path: absPath,client });
  res.send("done");
});
module.exports = router;
