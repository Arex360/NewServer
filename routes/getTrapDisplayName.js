const express = require('express')
const { getTrapName, _getTrapDisplayName } = require('../firebase/trapAlias')
const query = require('../service/query')
const router = express.Router()
router.get('/getTrapDisplayName/:clientID/:trapID',async (req,res)=>{
    const {trapID,clientID} = req.params
    const snapshot = await _getTrapDisplayName({clientID,trapID})
    console.log('trap added')
    res.send(snapshot)
})
module.exports = router