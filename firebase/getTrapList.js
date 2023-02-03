const {database} = require('./firebase')
const md5 = require('md5')
const getTrapList = async ({id})=>{
    let ref = database.ref(`accounts/${id}/traps`)
    ref = await ref.once('value')
    ref = ref.val()
    let traps = []
    for(var key in ref){
        console.log(key)
        const trap = database.ref(`accounts/${id}/traps/${key}`)
        let snapShot =await trap.get()
        snapShot = snapShot.val()
        const {trapID} = snapShot
        traps.push(trapID)
    }
    return traps
}
module.exports = getTrapList