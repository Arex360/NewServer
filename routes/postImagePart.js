const express = require("express");
const crypto = require("crypto");
const query = require("../service/query");
const fs = require("fs").promises; // Use promises version of fs for async operations
const router = express.Router();
const base64ToImage = require("base64-to-image");
const axios = require("axios");
const path = require('path');

let keyMap = new Map();

router.post("/postImagePart/:client/:flag", async (req, res) => {
    try {
        let url = req.body.base64;
        let flag = req.params.flag;
        console.log(flag);
        let filename = "";
        let { client } = req.params;
        let log = new Date().toString() + "received image" + "\n";
        // Use fs.promises.appendFile for async operation
        await fs.appendFile(client + '.txt', log);
        
        // Create a unique filename
        filename = crypto
            .createHash("sha256")
            .update(client + Date.now().toString())
            .digest("hex")
            .toString()
            .substring(0, 8);
            
        let id = req.body.id;
        let output = filename + "out";
        filename = "images/" + client + "_" + filename + ".png";
        console.log(`[debug] current flag ${flag}`);
        flag = flag.toString();

        if (flag !== "2") {
            if (!keyMap.has(client)) {
                keyMap.set(client, []);
            }
            console.log(`Client has ${keyMap.get(client).length}`);
            keyMap.get(client).push(url);
            console.log(keyMap.get(client).length);
        } else {
            console.log(`current flag ${flag}`);
            if (!keyMap.has(client)) {
                console.error("Error: Client not found in keyMap.");
                return res.status(400).send("Client not found in keyMap.");
            }
            let totalData = keyMap.get(client).join('');
            // Decode the base64 encoded image data
            let binaryData = Buffer.from(totalData, "base64");
            
            // Check if the file size is greater than 100KB
            // 100000
            if (binaryData.length > 100) {
                await fs.writeFile(filename, binaryData);
                const absPath = path.resolve(filename);
                console.log(absPath);
                keyMap.delete(client);
                console.log(filename);

                let response = await axios.get(`http://127.0.0.1:5000/getmodel/${client}`);
                let modelID = response.data.modelID;
                console.log(`printing model : ${modelID}`);
                await axios.post("http://127.0.0.1:80", { path: absPath, client, model: modelID });
            }
            const date = Date.now() / 1000;
            console.log("getting date");
            if (client !== "date") {
                let data = await axios.get(`http://localhost:5000/Adddetection/${client}/date/${date}`);
            }
        }
        res.send("done");
    } catch (error) {
        console.error("Error:", error);
        res.status(500).send("Internal Server Error");
    }
});

module.exports = router;
