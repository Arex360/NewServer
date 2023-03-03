/*
Used for the registering of the trap, the client will add Trap by adding its ID
*/

const express = require('express')
const { getTrapName } = require('../firebase/trapAlias')
const query = require('../service/query')
const router = express.Router()
router.get('/getTrapName/:trapID',async (req,res)=>{
    const {trapID} = req.params
    const snapshot = await getTrapName({trapID})
    console.log('trap added')
    res.send(snapshot)
})
module.exports = router