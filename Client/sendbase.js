const base64 = require('image-to-base64')
const axios = require('axios')
base64('picture1.jpg').then(res=>{
    console.log("took base64")
    const base64 = res
    const client = "client3"
    axios.post('http://localhost:5000/postImage',{client,base64}).then(res=>{
        console.log('request sent')
    }).catch(e=>{
        console.log(e)
    })    
}).catch(e=>{
    console.log(e)
})