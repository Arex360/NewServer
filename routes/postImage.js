const express = require('express')
const crypto = require('crypto')
const query = require('../service/query')
const fs = require('fs')
const router = express.Router()
const base64ToImage = require('base64-to-image')
router.post('/postImage',(req,res)=>{
    let url = req.body.base64;
    let filename = "";
    let client = req.body.client;
    
    console.log(url)
    // Create a unique filename
    filename = require('crypto').createHash('sha256').update(url).digest('hex').toString();
    filename = filename.substring(0, 8);
    let id = req.body.id;
    let output = filename + "out";
    filename = "images/" + filename + '.png';
    // Decode the base64 encoded image data
    let binaryData = Buffer.from(url, 'base64');

    fs.writeFileSync(filename, binaryData);
    res.send('done')
})
module.exports = router
