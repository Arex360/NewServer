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
const _setTrapDisplayName = async({trapID,alias,clientID})=>{
    let ref = database.ref(`alias/${clientID}/${trapID}`)
    const snapshot = await ref.set(alias)
}
const _getTrapDisplayName = async ({trapID,clientID})=>{
    let ref = database.ref(`alias/${clientID}/${trapID}`)
    let snapShot = await ref.get()
    const {alias} = snapShot.val()
    console.log(snapShot.val())
    return snapShot.val()
}
module.exports = {setTrapName,getTrapName,_setTrapDisplayName,_getTrapDisplayName}