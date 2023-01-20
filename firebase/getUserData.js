const {firestore} = require('./firebase')
const GetUserPassword = async ({id})=>{
     let snapshot = await firestore.collection('users').doc(id).get()
     snapshot = snapshot.data().password
     return snapshot
}
module.exports = GetUserPassword
