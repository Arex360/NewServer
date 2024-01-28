const express = require('express')
const cors = require('cors')
const base64ToImage = require("base64-to-image");
const axios = require("axios");
const path = require('path')
const bodyparser = require('body-parser')
const fs = require('fs')
let clientImageData = {};
const app = express()
const crypto = require('crypto')
app.use(cors())
//app.use(bodyparser());
app.use(bodyparser.json({ limit: '50mb', extended: true }));
app.use(bodyparser.urlencoded({ limit: '50mb', extended: true }));
const queue = []
let keys0 = new Map()
let keys1 = new Map()
let keys2 = new Map()
let keys3 = new Map()
let keys4 = new Map()
let keys5 = new Map()
let keys6 = new Map()
let keys7 = new Map()
let template = async (req,res,id)=>{
    let keys = new Map()
    if(id==0)
        keys = keys0
    else if(id == 1)
        keys = keys1
        else if(id == 2)
        keys = keys2
        else if(id == 3)
        keys = keys3
        else if(id == 4)
        keys = keys4
        else if(id == 5)
        keys = keys5
        else if(id == 6)
        keys = keys6
    
    let url = req.body.base64;
    let flag = req.params.flag
    console.log(flag)
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
      .update(client+Date.now().toString())
      .digest("hex")
      .toString();
    filename = filename.substring(0, 8);
    let output = filename + "out";
    filename = "images/" + client + "_" +filename + ".png";
    if(flag != 2){
       if(!keys.has(client) && flag == 0){
          keys.set(client,[])
       }
       keys.get(`${client}`).push(url)
       console.log(keys.get(`${client}`).length)
    }else{
      let totalData = ""
      for(let i = 0; i < keys.get(`${client}`).length;i++){
          totalData += keys.get(`${client}`)[i]
      }
        // Decode the base64 encoded image data
    let binaryData = Buffer.from(totalData, "base64");
    // Check if the file size is greater than 100KB
    // 100000
    if (binaryData.length > 100) {
      fs.writeFileSync(filename, binaryData);
      const absPath =path.resolve(filename)
      console.log(absPath)
      keys.delete(`${client}`)
      console.log(filename)

    
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
    }
    if(id==0)
    keys0 = keys
else if(id == 1)
    keys1 = keys
    else if(id == 2)
    keys2 = keys
    else if(id == 3)
    keys3 = keys
    else if(id == 4)
    keys4 = keys
    else if(id == 5)
    keys5 = keys
    else if(id == 6)
    keys6 = keys
    res.send("done");

}
app.post("/postImagePart0/:client/:flag",async(req,res)=>{
    template(req,res,0)
})
app.post("/postImagePart1/:client/:flag",async(req,res)=>{
    template(req,res,1)
})
app.post("/postImagePart2/:client/:flag",async(req,res)=>{
    template(req,res,2)
})
app.post("/postImagePart3/:client/:flag",async(req,res)=>{
    template(req,res,3)
})
app.post("/postImagePart4/:client/:flag",async(req,res)=>{
    template(req,res,4)
})
app.post("/postImagePart5/:client/:flag",async(req,res)=>{
    template(req,res,5)
})
app.post("/postImagePart6/:client/:flag",async(req,res)=>{
    template(req,res,6)
})
app.listen(1000,()=>{
    console.log("starting..")
})