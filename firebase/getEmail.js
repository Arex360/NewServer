const { firestore } = require('./firebase')
const GetUserProfile = async ({id})=>{
     const snapshot = await firestore.collection('users').doc(id).get()
     return snapshot.data()
     
}
module.exports = GetUserProfile