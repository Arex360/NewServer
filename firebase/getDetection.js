const {database} = require('./firebase')
const getDetection = async ({name,id})=>{
    let ref = database.ref(`detection/${id}/${name}`)
    let data = await ref.get()
    data = data.val()
    return data
}
module.exports = getDetection