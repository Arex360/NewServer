const express = require('express')
const addDetection = require('../firebase/addDetection')
const getDetection = require('../firebase/getDetection')
const router = express.Router()
router.get('/Getdetection/:clientID/:name', async (req,res)=>{
    let {clientID,name} = req.params
    const snapShot = getDetection({id:clientID,name})
    res.send(snapshot)
})
module.exports = router