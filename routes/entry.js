// status inactive

const express = require('express')
const query = require('../service/query')
const router = express.Router()
router.get('/',(req,res)=>{
    //query("select * from photos",res)
    res.send('OK')
})
module.exports = router