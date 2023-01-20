//insertTempreture
const express = require('express')
const insert = require('../firebase/insertData')
const router = express.Router()
router.post('/insertTempreture', async (req,res)=>{
    const {client,humidity,tempreture} = req.body
    const snapshot = insert(`/weather/${client}`,{humidity,tempreture})
    res.send('done')
})
module.exports = router