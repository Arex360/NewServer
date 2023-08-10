const express = require("express");
const insert = require("../firebase/insertData");
const getData = require("../firebase/getData");
const router = express.Router()
router.get('/getModel/:clientID', async (req,res)=>{
    const {clientID} = req.params
    const snapshot = await getData(`models/${clientID}`)
    res.send(snapshot)
})
module.exports = router