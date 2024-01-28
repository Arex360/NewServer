const express = require("express");
const crypto = require("crypto");
const fs = require("fs");
const axios = require("axios");
const path = require("path");

let keys = {};
let lock = {};

const router = express.Router();

router.post("/postImagePart/:client/:flag", async (req, res) => {
  const { client } = req.params;
  const url = req.body.base64;
  const flag = req.params.flag;

  console.log("Request logged");
  console.log("client:", client);
  console.log("flag:", flag);

  // Ensure that keys object is initialized for each client
  if (!keys[client]) {
    keys[client] = [];
  }

  // Use a lock to handle concurrent requests
  if (!lock[client]) {
    lock[client] = true;

    try {
      console.log("Entering critical section");

      // Your existing code for handling requests
      if (flag !== "2") {
        keys[client].push(url);
        console.log("Pushed URL to keys array");
        console.log("keys length:", keys[client].length);
      } else {
        const totalData = keys[client].join("");

        if (totalData.length > 0) {
          const binaryData = Buffer.from(totalData, "base64");

          if (binaryData.length > 100) {
            const filename = crypto
              .createHash("sha256")
              .update(client + Date.now().toString())
              .digest("hex")
              .substring(0, 8);

            const imagePath = "images/" + client + "_" + filename + ".png";

            fs.writeFileSync(imagePath, binaryData);
            const absPath = path.resolve(imagePath);
            console.log("Image saved:", absPath);

            const response = await axios.get(
              `http://127.0.0.1:5000/getmodel/${client}`
            );
            const modelID = response.data.modelID;
            console.log("Model ID:", modelID);

            // Uncomment the following line if you want to send a POST request
            // await axios.post("http://127.0.0.1:80", { path: absPath, client, model: modelID });
          }

          if (client !== "date") {
            const date = Date.now() / 1000;
            console.log("Getting date:", date);
            const data = await axios.get(
              `http://localhost:5000/Adddetection/${client}/date/${date}`
            );
          }
        }
      }

      console.log("Exiting critical section");
    } finally {
      // Release the lock
      delete lock[client];
    }

    console.log("Done processing request");
    res.send("done");
  }
});

module.exports = router;
