/*

API to validate trap if its exists


*/

const express = require('express')
const md5 = require('md5')
const isTrapValid = require('../firebase/validateTap')
const router = express.Router()
router.post('/validate', async (req,res)=>{
    let {trapID} = req.body
    trapID = md5(trapID)
    const snapshot = await isTrapValid(trapID)
    if(snapshot == true){
        res.send('trap exists')
    }else{
        res.send("trap doesn't exists")
    }
})
module.exports = router