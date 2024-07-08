const base64 = require('image-to-base64')
const axios = require('axios')
base64('logo1.png').then(res=>{
    console.log("took base64")
    const base64 = res
    const client = "client17"
    axios.post('http://mnsstrap.ddns.net:5000/postImage/client17',{client,base64}).then(res=>{
        console.log('request sent')
    }).catch(e=>{
        console.log(e)
    })    
}).catch(e=>{
    console.log(e)
})
//mnsstrap.ddns.net