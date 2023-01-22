const {database} = require('./firebase')
const isTrapValid = async (trapID)=>{
    const ref = database.ref(`validTraps/${trapID}`)
    let snapshot = await ref.once('value')
    if(snapshot.val()){
        return true
    }else{
        return false
    }
}
module.exports = isTrapValid