const {database} = require('./firebase')
const getTrapTime = async ({trapID})=>{
    let ref = database.ref(`env/${trapID}/date`)
    const snapshot = await ref.get()
    return snapshot.val()
}
module.exports = getTrapTime