const express = require('express')
const crypto = require('crypto')
const query = require('../service/query')
const fs = require('fs')
const router = express.Router()
router.post('/postImage',(req,res)=>{
    let url = req.body.base64
    let filename = ""
    let client = req.body.client
    
    //filename = require('crypto').createHash('sha256').update(url).digest('hex').toString()
    filename = "hsdjhsdjksdhjksdhjhdjsh"
    filename = filename.substring(0,8)
    let id= req.body.id
    let output = filename+"out"
    let base64 = url
    filename = "images/"+filename +'.png'
    fs.writeFile(filename,base64,{encoding: 'base64'},err=>{
        res.send('done')
    })
    /*fs.writeFile(filename, base64, {encoding: 'base64'}, function(err) {
        exec(`python detect.py --source ${filename} --weights best_new.pt --out ${output}`,()=>{
            const url = `http://121.52.158.157:4000/img&${output}`
            try{
              query(`insert into photos (image,client) values ('${url}','${client}')`,res)
            }catch(e){
            }
        })
    });*/
})
module.exports = router
