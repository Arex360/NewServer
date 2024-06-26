const express = require('express')
const addDetection = require('../firebase/addDetection')
const getDetection = require('../firebase/getDetection')
const router = express.Router()
router.get('/Getdetection/:clientID/:name', async (req,res)=>{
    let {clientID,name} = req.params
    if(name == "fallarmyworm")
    {
        name = "fall-armyworm"
    }else if( name == "pinkbollworm"){
        name = "pink-bollworm"
    }
    const snapShot = await getDetection({id:clientID,name})
    if(snapShot)
        res.send(snapShot.count)
    else 
        res.send("0")
})
module.exports = router