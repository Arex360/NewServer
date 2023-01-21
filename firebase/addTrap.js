const {database} = require('./firebase')
const md5 = require('md5')
const registerTrap = async ({email,trapID})=>{
    const id = md5(email)
    trapID = md5(trapID)
    let ref = database.ref(`accounts/${id}/traps`)
    const snapshot = await ref.push({trapID})
    let ownerRef = database.ref(`/traps/${trapID}`)
    const snapShot = await ownerRef.set({owner:id})
    return true
}
module.exports = registerTrap