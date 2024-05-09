const express = require('express')
const axios = require('axios')
const router = express.Router()
router.get('/absCount/:clientID', async (req,res)=>{
    const {clientID} = req.params
    let res1 = await axios.get(`http://mnsstrap.ddns.net:5000/getdetection/${clientID}/zonata`)
    let res2 = await axios.get(`http://mnsstrap.ddns.net:5000/getdetection/${clientID}/pinkbollworm`)
    let res3 = await axios.get(`http://mnsstrap.ddns.net:5000/getdetection/${clientID}/cucurbitae`)
    let res4 = await axios.get(`http://mnsstrap.ddns.net:5000/getdetection/${clientID}/dorsalis`)
    let res5 = await axios.get(`http://mnsstrap.ddns.net:5000/getdetection/${clientID}/fallarmyworm`)
    res1 = res1.data 
    res2 = res2.data 
    res3 = res3.data 
    res4 = res4.data 
    res5 = res5.data
    res1 = Number(res1)
    res2 = Number(res2)
    res3 = Number(res3)
    res4 = Number(res4)
    res5 = Number(res5)
    let count = res1 + res2 + res3 + res4 + res5 
    res.send('ok')
})
module.exports = router