const express = require('express')
const GetUserProfile = require('../firebase/getEmail')

const router = express.Router()
router.get('/getData/:id', async (req,res)=>{
    let {id} = req.params
    const snapshot = await GetUserProfile({id})
    res.send(snapshot)
})
module.exports = router