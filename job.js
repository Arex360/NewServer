const express = require('express');
const cors = require('cors');
const axios = require("axios");
const path = require('path');
const bodyparser = require('body-parser');
const fs = require('fs');
const app = express();
const crypto = require('crypto');

app.use(cors());
app.use(bodyparser.json({ limit: '50mb', extended: true }));
app.use(bodyparser.urlencoded({ limit: '50mb', extended: true }));

let keys0 = new Map();
let keys1 = new Map();
let keys2 = new Map();
let keys3 = new Map();
let keys4 = new Map();
let keys5 = new Map();
let keys6 = new Map();
let keys7 = new Map();

let template = async (req, res, id) => {
  let keys = getKeysById(id);

  let url = req.body.base64;
  let flag = req.params.flag;
  let client = req.params.client;

  let filename = crypto.createHash("sha256")
    .update(client + Date.now().toString())
    .digest("hex")
    .substring(0, 8);

  let output = filename + "out";
  let imagePath = path.join(__dirname, 'images', `${client}_${filename}.png`);

  if (flag !== '2') {
    if (!keys.has(client)) {
      keys.set(client, []);
    }
    keys.get(client).push(url);
    console.log(keys.get(client).length);
  } else {
    let totalData = keys.get(client).join('');
    let binaryData = Buffer.from(totalData, "base64");

    if (binaryData.length > 100) {
      await fs.promises.writeFile(imagePath, binaryData);
      const absPath = path.resolve(imagePath);
      console.log(absPath);
      keys.delete(client);

      let modelResponse = await axios.get(`http://127.0.0.1:5000/getmodel/${client}`);
      let modelID = modelResponse.data.modelID;
      console.log(`Printing model: ${modelID}`);

      await axios.post("http://127.0.0.1:80", { path: absPath, client, model: modelID });
    }

    const date = Date.now() / 1000;
    console.log("Getting date");
    let data = "";
    if (client !== "date") {
      data = await axios.get(`http://localhost:5000/Adddetection/${client}/date/${date}`);
    }
  }

  updateKeysById(id, keys);
  res.send("done");
};

function getKeysById(id) {
  switch (id) {
    case 0: return keys0;
    case 1: return keys1;
    case 2: return keys2;
    case 3: return keys3;
    case 4: return keys4;
    case 5: return keys5;
    case 6: return keys6;
    default: return new Map();
  }
}

function updateKeysById(id, keys) {
  switch (id) {
    case 0: keys0 = keys; break;
    case 1: keys1 = keys; break;
    case 2: keys2 = keys; break;
    case 3: keys3 = keys; break;
    case 4: keys4 = keys; break;
    case 5: keys5 = keys; break;
    case 6: keys6 = keys; break;
    default: break;
  }
}

app.post("/postImagePart0/:client/:flag", async (req, res) => {
  template(req, res, 0);
});

app.post("/postImagePart1/:client/:flag", async (req, res) => {
  template(req, res, 1);
});

app.post("/postImagePart2/:client/:flag", async (req, res) => {
  template(req, res, 2);
});

app.post("/postImagePart3/:client/:flag", async (req, res) => {
  template(req, res, 3);
});

app.post("/postImagePart4/:client/:flag", async (req, res) => {
  template(req, res, 4);
});

app.post("/postImagePart5/:client/:flag", async (req, res) => {
  template(req, res, 5);
});

app.post("/postImagePart6/:client/:flag", async (req, res) => {
  template(req, res, 6);
});

app.listen(1000, () => {
  console.log("Server started on port 1000");
});
