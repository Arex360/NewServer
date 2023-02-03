// status inactive
const express = require('express')
const getTrapList = require('../firebase/getTrapList')
const query = require('../service/query')
const router = express.Router()
router.get('/traps/:id',async (req,res)=>{
    const {id} = req.params
    const data = await getTrapList({id})
    res.send(data)
})
module.exports = router