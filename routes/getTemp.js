/*

Used to get tarp environment data
realtime database


*/


const express = require('express')
const getWeather = require('../firebase/getWeatherData')
const router = express.Router()
router.post('/getWeather', async (req,res)=>{
    const {trapID} = req.body
    const snapshot = await getWeather({trapID})
    res.send(snapshot)
})
module.exports = router