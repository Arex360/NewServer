//insertTempreture
const express = require('express')
const insert = require('../firebase/insertData')
const register = require('../firebase/register')
const router = express.Router()
router.post('/register', async (req,res)=>{
    const {email,password,name} = req.body
    const snapshot = await register({email,password,name})
    res.send('registerd')
})
module.exports = router