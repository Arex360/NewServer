const express = require('express');
const cors = require('cors');
const axios = require('axios');
const path = require('path');
const bodyparser = require('body-parser');
const fs = require('fs');
const crypto = require('crypto');

class ImageHandler {
    constructor() {
        this.clientImageData = {};
    }

    async processImage(url, client, flag) {
        console.log(flag);
        let filename = '';
        let log = new Date().toString() + ' received image\n';
        fs.appendFile(client + '.txt', log, (err) => {
            if (err) throw err;
            console.log('Request logged');
        });

        // Create a unique filename
        filename = crypto
            .createHash('sha256')
            .update(client + Date.now().toString())
            .digest('hex')
            .toString()
            .substring(0, 8);
        let output = filename + 'out';
        filename = 'images/' + client + '_' + filename + '.png';

        if (flag !== 2) {
            if (!this.clientImageData[client] && flag === 0) {
                this.clientImageData[client] = [];
            }
            if (!this.clientImageData[client] || this.clientImageData[client] === undefined) {
                this.clientImageData[client] = [];
            }
            this.clientImageData[client].push(url);
            console.log(this.clientImageData[client].length);
        } else {
            // Check if this.clientImageData[client] is defined before accessing its properties
            if (true) {
                let totalData = '';
                for (let i = 0; i < this.clientImageData[client].length; i++) {
                    totalData += this.clientImageData[client][i];
                }
                // Decode the base64 encoded image data
                let binaryData = Buffer.from(totalData, 'base64');
                // Check if the file size is greater than 100KB
                // 100000
                if (binaryData.length > 100) {
                    fs.writeFileSync(filename, binaryData);
                    const absPath = path.resolve(filename);
                    console.log(absPath);
                    // Clear the image data for this client
                    this.clientImageData[client] = null;
                    console.log(filename);

                    let res = await axios.get(`http://127.0.0.1:5000/getmodel/${client}`);
                    res = res.data;
                    res = res.modelID;
                    console.log(`printing model : ${res}`);
                    //axios.post("http://127.0.0.1:80", { path: absPath, client, model: res });
                }
                const date = Date.now() / 1000;
                console.log('getting date');
                let data = '';
                if (client !== 'date') {
                    data = await axios.get(`http://localhost:5000/Adddetection/${client}/date/${date}`);
                }
            }
        }
    }
}

const app = express();
app.use(cors());
app.use(bodyparser.json({ limit: '50mb', extended: true }));
app.use(bodyparser.urlencoded({ limit: '50mb', extended: true }));

const imageHandler = new ImageHandler();
const queue = [];

const ExecuteQueue = async () => {
    setTimeout(() => {
        if (queue.length > 0) {
            let i = queue.splice(0, 1);
            //i[0]['out']()
            imageHandler.processImage(i[0]['out'].url, i[0]['out']._client, i[0]['out'].flag);
            console.log('done');
        }
        setTimeout(() => ExecuteQueue(), 800);
    }, 6000);
};

app.get('/exp/:data', (req, res) => {
    queue.push();
    res.send('ok');
});

app.post('/postImagePart/:client/:flag', async (req, res) => {
    let url = req.body.base64;
    console.log(url.length);
    let flag = req.params.flag;
    let _client = req.params.client;
    // queue.push({'out':()=>build(url,_client,flag,0)})
    queue.push({ 'out': { url, _client, flag } });
    res.send('done');
});

app.listen(1000, () => {
    console.log('starting..');
    ExecuteQueue();
});
