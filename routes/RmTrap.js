const express = require('express')
const removeTrap = require('../firebase/removeTrap')
const router = express.Router()
router.get('/rmTrap/:id/:trapID', async (req,res)=>{
    const {id,trapID} = req.params
    const removed = await removeTrap({id,trapID})
    res.send(removed)
})
module.exports = router