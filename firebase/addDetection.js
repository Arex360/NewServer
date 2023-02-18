const {database} = require('./firebase')
const addDetection = async ({name,count,id})=>{
    let ref = database.ref(`detection/${id}/${name}`)
    await ref.set({count})
}
module.exports = addDetection