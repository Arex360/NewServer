const query = require('../service/query')
const express = require('express')
const router = express.Router()
function getSevenDaysBeforeCurrentTimestamp(days) {
    // Create a new Date object for the current date
    let currentDate = new Date();

    // Subtract 7 days (7 * 24 * 60 * 60 * 1000 milliseconds)
    let sevenDaysBeforeDate = new Date(currentDate.getTime() - (days * 24 * 60 * 60 * 1000));

    // Get the timestamp in milliseconds and convert to seconds
    let sevenDaysBeforeTimestampInSeconds = Math.floor(sevenDaysBeforeDate.getTime());

    return sevenDaysBeforeTimestampInSeconds;
}
router.get('/getChart/:clientID/:days',(req,res)=>{
    const {clientID,days} = req.params
    let time = getSevenDaysBeforeCurrentTimestamp(Number(days))
    console.log(time)
    query(`SELECT * FROM battery WHERE client = "${clientID}" AND time >= ${time}`,res)
})
module.exports = router