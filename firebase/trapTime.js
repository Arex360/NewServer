const {database} = require('./firebase')
const getTrapTime = async ({trapID})=>{
    let ref = database.ref(`env/${trapID}/date`)
    let time = database.ref(`env/${trapID}/timestamp`)
    const snapshot = await ref.get()
    const _time = await time.get()
    return snapshot.val() + '-'+ _time.val()
}
module.exports = getTrapTime