//insertTempreture
const express = require('express')
const md5 = require('md5')
const insert = require('../firebase/insertData')
const Login = require('../firebase/login')
const register = require('../firebase/register')
const router = express.Router()
router.post('/login', async (req,res)=>{
    let {email,password,name} = req.body
    password = md5(password)
    const snapshot = await Login({email,password})
    res.send(snapshot)
})
module.exports = router