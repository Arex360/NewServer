/*
Used for the registering of the trap, the client will add Trap by adding its ID
*/

const express = require('express')
const setTrapName = require('../firebase/trapAlias')
const getTrapTime = require('../firebase/trapTime')
const query = require('../service/query')
const router = express.Router()
router.get('/getTrapTime/:trapID',async (req,res)=>{
    const {trapID} = req.params
    const snapshot = await getTrapTime({trapID})
    console.log('trap added')
    res.send(snapshot)
})
module.exports = router