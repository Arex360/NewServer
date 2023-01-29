const {execSync} = require('child_process')
const base64 = require('image-to-base64')
const axios = require('axios')
let takePhoto = ()=>{
      setTimeout(() => {
        console.log('turning on camera')
        execSync('python client.py 192.168.43.100 3s 1')
        setTimeout(()=>{
            console.log("taking photo")
            execSync('ffmpeg -y -rtsp_transport tcp -i "rtsp://admin:@192.168.43.30" -frames 1 ./picture1.jpg')
            setTimeout( ()=>{
                execSync('echo hi')
                console.log('taken photo')
                setTimeout(()=>{
                    base64('picture1.jpg').then(res=>{
                        console.log(res)
                        const base64 = res
                        const client = "client1"
                        axios.post('http://34.125.238.213:5000/postImage',{client,base64}).then(res=>{
                            console.log('request sent')
                            setTimeout(()=>takePhoto(),1000*5)
                        })    
                    })
                },2000)
            },1000)
        },2500)
    }, 0);    
}
takePhoto()

// /http://34.125.238.213:5000/postImage