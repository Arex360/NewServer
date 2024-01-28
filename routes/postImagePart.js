const express = require("express");
const crypto = require("crypto");
const fs = require("fs");
const axios = require("axios");
const path = require('path');
const router = express.Router();

// Use an object to store image data for each client
let clientImageData = {};
router.post("/postImagePart/:client/:flag", async (req, res) => {
  let url = req.body.base64;
  let flag = req.params.flag;
  let { client } = req.params;

  console.log(flag);
  let filename = "";
  let log = new Date().toString() + "received image" + "\n";
  fs.appendFile(client + '.txt', log, (err) => {
      if (err) throw err;
      console.log('Request logged');
  });

  // Create a unique filename
  filename = crypto
      .createHash("sha256")
      .update(client + Date.now().toString())
      .digest("hex")
      .toString().substring(0, 8);

  let id = req.body.id;
  let output = filename + "out";
  filename = "images/" + client + "_" + filename + ".png";

  if (flag != 2) {
      if (clientImageData[client] == null && flag == 0) {
          clientImageData[client] = [];
      }
      if (clientImageData[client] == null || clientImageData[client] == undefined) {
          clientImageData[client] = [];
      }
      clientImageData[client].push(url);
      console.log(clientImageData[client].length);
  } else {
      // Check if clientImageData[client] is defined before accessing its properties
      if (clientImageData[client] && clientImageData[client].length > 0) {
          let totalData = "";
          for (let i = 0; i < clientImageData[client].length; i++) {
              totalData += clientImageData[client][i];
          }
          // Decode the base64 encoded image data
          let binaryData = Buffer.from(totalData, "base64");
          // Check if the file size is greater than 100KB
          // 100000
          if (binaryData.length > 100) {
              fs.writeFileSync(filename, binaryData);
              const absPath = path.resolve(filename);
              console.log(absPath);
              // Clear the image data for this client
              clientImageData[client] = null;
              console.log(filename);

              let res = await axios.get(`http://127.0.0.1:5000/getmodel/${client}`);
              res = res.data;
              res = res.modelID;
              console.log(`printing model : ${res}`);
              axios.post("http://127.0.0.1:80", { path: absPath, client, model: res });
          }
          const date = Date.now() / 1000;
          console.log("getting date");
          let data = "";
          if (client != "date") {
              data = await axios.get(`http://localhost:5000/Adddetection/${client}/date/${date}`);
          }
      }
  }
  res.send("done");
})
module.exports = router;
