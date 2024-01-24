const express = require('express')
const {setTrapName, _setTrapDisplayName} = require('../firebase/trapAlias')
const query = require('../service/query')
const router = express.Router()
router.post('/setTrapDisplayName/:clientID/:trapID',(req,res)=>{
    const {trapID,clientID} = req.params
    const {trapName} = req.body
  //  const snapshot = setTrapName({trapID:trapID,alias:trapName})
    const snapShot = _setTrapDisplayName({alias:trapName,clientID,trapID})
    console.log('trap added')
    res.send('ok')
})
module.exports = router