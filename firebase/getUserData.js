const {firestore} = require('./firebase')
const GetUserPassword = async ({id})=>{
     let snapshot = await firestore.collection('users').doc(id).get()
     if(snapshot.data())
          snapshot = snapshot.data().password
     else
          snapshot = "-1"
     return snapshot
}
module.exports = GetUserPassword
