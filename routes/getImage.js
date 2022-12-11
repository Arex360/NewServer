const express = require('express')
const query = require('../service/query')
const router = express.Router()
router.get('/images/:id',(req,res)=>{
    const sql = `select image from photos where client = '${req.params.id}' order by id desc limit 1`
    query(sql,res)
})
module.exports = router