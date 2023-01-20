const {database} = require('./firebase')
const insert = async (path,data)=>{
    let ref = database.ref(path)
    const snapshot = await ref.set(data)
    return true
}
module.exports = insert