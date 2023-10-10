const express = require('express')
const addDetection = require('../firebase/addDetection')
const axios = require('axios')
const router = express.Router()
router.get('/Adddetection/:clientID/:name/:count', async (req,res)=>{
    let {clientID,count,name} = req.params
    if(name == "fallarmyworm")
    {
        name = "fall-armyworm"
    }else if( name == "pinkbollworm"){
        name = "pink-bollworm"
    }
    await addDetection({name,count,id:clientID})
    const date = Date.now()/1000
    let data = ""
    if(clientID != "date")
       data = await axios.get(`http://localhost:5000/Adddetection/${clientID}/date/${date}`)
    res.send('done')
})
module.exports = router