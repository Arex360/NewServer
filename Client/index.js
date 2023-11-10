const {execSync,spawn} = require('child_process')
const base64 = require('image-to-base64')
const axios = require('axios')
let takePhoto = ()=>{
      setTimeout(() => {
        console.log('turning on camera')
        execSync('python client.py 192.168.43.100 3s 1')
        //const args = ['client.py', '192.168.43.100', '3s', '1'];

        //const pythonProcess = spawn(command, args);
        setTimeout(()=>{
            console.log("taking photo")
           // execSync(' ')
           const ffmpegCommand = spawn('ffmpeg', ['-y', '-rtsp_transport', 'tcp', '-i', 'rtsp://admin:@192.168.43.30', '-frames', '1', './picture1.jpg']);
            setTimeout( ()=>{
                execSync('echo hi')
                console.log('taken photo')
                setTimeout(()=>{
                    base64('1.jpg').then(res=>{
                        console.log("took base64")
                        const base64 = res
                        const client = "client2"
                        axios.post('http://34.125.238.213:5000/postImage',{client,base64}).then(res=>{
                            console.log('request sent')
                            setTimeout(()=>safeTakePhoto(),1000*5)
                        }).catch(e=>{
                            console.log("error, retrying")
                            console.log("retrying in 10 seconds")
                            setTimeout(()=>{
                               safeTakePhoto()
                            },1000*10)
                        })    
                    }).catch(e=>{
                        console.log("image not found, retrying in 10 seconds")
                        setTimeout(()=>{
                            safeTakePhoto()
                         },1000*10)
                    })
                },2000)
            },1000)
        },2500)
    }, 0);    
}

function safeTakePhoto(){
    try{
        takePhoto()
    }catch(e){
        console.log("retrying in 10 seconds");
        setTimeout(()=>safeTakePhoto(),1000*10)
    }
}

safeTakePhoto()

// /http://34.125.238.213:5000/postImage