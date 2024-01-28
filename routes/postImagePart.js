const express = require("express");
const crypto = require("crypto");
const query = require("../service/query");
const fs = require("fs");
const router = express.Router();
const base64ToImage = require("base64-to-image");
const axios = require("axios");
const path = require('path')

// Use Map instead of a plain object
let clientImageData = new Map();

router.post("/postImagePart/:client/:flag", async (req, res) => {
    let url = req.body.base64;
    let flag = req.params.flag;
    console.log(flag);
    let filename = "";
    let { client } = req.params;
    let log = new Date().toString() + " received image" + "\n";
    fs.appendFile(client + '.txt', log, (err) => {
        if (err) throw err;
        console.log('Request logged');
    });
    // Create a unique filename
    filename = crypto
        .createHash("sha256")
        .update(client + Date.now().toString())
        .digest("hex")
        .toString();
    filename = filename.substring(0, 8);
    let id = req.body.id;
    let output = filename + "out";
    filename = "images/" + client + "_" + filename + ".png";

    if (flag !== 2) {
        // Check if the key exists in the Map, and initialize if not
        if (!clientImageData.has(client) && flag === 0) {
            clientImageData.set(client, []);
        }
        // Check if the key exists before pushing the url
        if (clientImageData.has(client)) {
            clientImageData.get(client).push(url);
            console.log(clientImageData.get(client).length);
        }
    } else {
        if (clientImageData.has(client)) {
            let totalData = "";
            for (let i = 0; i < clientImageData.get(client).length; i++) {
                totalData += clientImageData.get(client)[i];
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
                clientImageData.delete(client);
                console.log(filename);

                let res = await axios.get(`http://127.0.0.1:5000/getmodel/${client}`);
                res = res.data;
                res = res.modelID;
                console.log(`printing model : ${res}`);
                //axios.post("http://127.0.0.1:80", { path: absPath, client, model: res });
            }
            const date = Date.now() / 1000;
            console.log("getting date");
            let data = "";
            if (client !== "date") {
                data = await axios.get(`http://localhost:5000/Adddetection/${client}/date/${date}`);
            }
        }
    }
    res.send("done");
});

module.exports = router;
