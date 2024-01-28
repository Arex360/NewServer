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
let keys = {}
router.post("/postImagePart/:client/:flag", async (req, res) => {
  let base64 = req.body.base64;
  axios.post(`http://localhost:1000/postImagePart/${req.params.client}/${req.params.flag}`,{base64})
  res.send("ok")    
});
module.exports = router;

