const {firestore} = require('./firebase')
const md5 = require('md5')
const register = async ({email,password,name})=>{
     const id = md5(email)
     password = md5(password)
     const snapshot = await firestore.collection('users').doc(id).set({email,password,id,name})
     console.log('data insrted')
}
module.exports = register
