const {database} = require('./firebase')
const trapEntry = async (trapID)=>{
    const ref = database.ref(`validTraps/${trapID}`)
    const snapshot = ref.set(true)
}
module.exports = trapEntry