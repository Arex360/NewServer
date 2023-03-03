/*
Used for the registering of the trap, the client will add Trap by adding its ID
*/

const express = require('express')
const {setTrapName} = require('../firebase/trapAlias')
const query = require('../service/query')
const router = express.Router()
router.get('/setTrapName/:trapID/:trapName',(req,res)=>{
    const {trapID,trapName} = req.params
    const snapshot = setTrapName({trapID:trapID,alias:trapName})
    console.log('trap added')
    res.send('ok')
})
module.exports = router