const {firestore} = require('./firebase')
const md5 = require('md5')
const GetUserPassword = require('./getUserData')
const Login = async ({email,password})=>{
     const id = md5(email)
     const _password = await GetUserPassword({id})
     if(password == _password){
         return id
     }else{
        return "error"
     }
}
module.exports = Login