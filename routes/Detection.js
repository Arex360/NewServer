const express = require('express')
const addDetection = require('../firebase/addDetection')
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
    res.send('done')
})
module.exports = router