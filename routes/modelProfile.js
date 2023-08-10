const express = require("express");
const insert = require("../firebase/insertData");
const router = express.Router()
router.get('/setModel/:clientID/:modelID', async (req,res)=>{
    const {clientID,modelID} = req.params
    const snapshot = await insert(`/models/${clientID}`,{modelID})
    res.send(snapshot)
})
module.exports = router