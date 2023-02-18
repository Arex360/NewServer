const express = require('express')
const addDetection = require('../firebase/addDetection')
const router = express.Router()
router.get('/Adddetection/:clientID/:name/:count', async (req,res)=>{
    let {clientID,count,name} = req.params
    await addDetection({name,count,id:clientID})
    res.send(snapshot)
})
module.exports = router