const base64 = require('image-to-base64')
const axios = require('axios')
base64('p1.jpg').then(res=>{
    console.log("took base64")
    const base64 = res
    const client = "client7"
    for(let i=1;i < 6;i++){
        axios.post(`http://mnsstrap.ddns.net:5000/postImage/client${i}`,{client,base64}).then(res=>{
        console.log('request sent')
    }).catch(e=>{
        console.log(e)
    })  
}  
}).catch(e=>{
    console.log(e)
})
//mnsstrap.ddns.net