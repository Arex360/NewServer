/*
It is used to profile up the trap . Reatime database

*/


const express = require('express')
const trapEntry = require('../firebase/trapEntry')
const md5 = require('md5')
const router = express.Router()
router.post('/enterTrap', async (req,res)=>{
    let {trapID} = req.body
    trapID = md5(trapID)
    const snapshot = await trapEntry(trapID)
    res.send('trapEnterd')
})
module.exports = router