const express = require('express')
const query = require('../service/query')
const router = express.Router()
router.get('/traps/:id',(req,res)=>{
    const sql = `select client from traps where userID= '${req.params.id}'`
    query(sql,res)
})
module.exports = router