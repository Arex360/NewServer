const {database} = require('./firebase')
const md5 = require('md5')
const setTrapName = async ({trapID,alias})=>{
    let ref = database.ref(`alias/${trapID}`)
    const snapshot = await ref.set({alias})
    return true
}
const getTrapName = async ({trapID})=>{
    let ref = database.ref(`alias/${trapID}`)
    let snapShot = await ref.get()
    const {alias} = snapShot.val()
    return alias
}
module.exports = {setTrapName,getTrapName}