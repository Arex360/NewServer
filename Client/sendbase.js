const base64 = require('image-to-base64')
const axios = require('axios')
base64('p1.jpg').then(res=>{
    console.log("took base64")
    const base64 = res
    const client = "client7"
    axios.post('http://mnsstrap.ddns.net:5000/postImage/client7',{client,base64}).then(res=>{
        console.log('request sent')
    }).catch(e=>{
        console.log(e)
    })    
}).catch(e=>{
    console.log(e)
})