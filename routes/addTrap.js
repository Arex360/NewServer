const express = require('express')
const registerTrap = require('../firebase/addTrap')
const query = require('../service/query')
const router = express.Router()
router.post('/addTrap',(req,res)=>{
    const {email,trapID} = req.body
    const snapshot = registerTrap({email,trapID})
    console.log('trap added')
    res.send('ok')
})
module.exports = router