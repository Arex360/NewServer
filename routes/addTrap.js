const express = require('express')
const query = require('../service/query')
const router = express.Router()
router.post('/addTrap',(req,res)=>{
    const userID = req.body.user
    const trap = req.baseUrl.trap
    query(`insert into traps (userID,client) values ('${userID}','${trap}')`,res)
})
module.exports = router