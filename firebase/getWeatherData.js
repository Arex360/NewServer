const {database} = require('./firebase')
let getWeather = async ({trapID})=>{
    const ref = database.ref(`weather/${trapID}`)
    const snapshot = await ref.once('value')
    return snapshot.val()
}
module.exports = getWeather