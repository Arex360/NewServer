const express = require('express')
const cors = require('cors')
const base64ToImage = require("base64-to-image");
const axios = require("axios");
const path = require('path')
const bodyparser = require('body-parser')
const fs = require('fs')
let keys = {}
const app = express()
app.use(cors())
app.use(bodyparser.urlencoded({ limit: "50mb", extended: true }));
const queue = []
const ExecuteQueue = async ()=>{
    setTimeout(() => {
      if(queue.length > 0){
        let i = queue.splice(0,1)
        i[0]['out']()
        console.log('done')
      }
      ExecuteQueue()
    }, 3000);
}
app.get('/exp/:data',(req,res)=>{
    queue.push()
    res.send("ok")
})
const build = async (url,client,flag,id)=>{
    console.log(flag)
    let filename = "";
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
    //let id = req.body.id;
    let output = filename + "out";
    filename = "images/" + client + "_" +filename + ".png";
    if(keys == null || keys == undefined){
        console.log('keys lost')
    }
    if(client == null || client == undefined){
        console.log('client lost')
    }
    if(flag != 2){
        console.log(`flag - ${flag}`)
       if(keys[client] == null && flag == 0){
          keys[client] = []
       }
       keys[`${client}`].push(url)
       console.log(keys[`${client}`].length)
    }else{
      let totalData = ""
      for(let i = 0; i < keys[`${client}`].length;i++){
          totalData += keys[`${client}`][i]
      }
        // Decode the base64 encoded image data
    let binaryData = Buffer.from(totalData, "base64");
    // Check if the file size is greater than 100KB
    // 100000
    if (binaryData.length > 100) {
      fs.writeFileSync(filename, binaryData);
      const absPath =path.resolve(filename)
      console.log(absPath)
      keys[`${client}`] = null
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
}
app.post("/postImagePart/:client/:flag",async (req,res)=>{
    let url = req.body.base64;
    let flag = req.params.flag
    let _client = req.params.client
    queue.push({'out':()=>build(url,_client,flag,0)})
    res.send("done");

})
app.listen(1000,()=>{
    console.log("starting..")
    ExecuteQueue()
})