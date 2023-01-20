const {database} = require('./firebase')
const getData = async (path)=>{
    const snapshot = await database.ref(path).get()
    return snapshot.val()
}
module.exports = getData