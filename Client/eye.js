const base64 = require('image-to-base64');
const axios = require('axios');

const startTime = Date.now();

base64('m.jpg').then(res => {
    console.log("took base64");
    base64('t.jpg').then(res2 => {
        console.log("took base 2");
        const sourceImage = res;
        const targetImage = res2;
        const clientID = "client7";

        axios.post('http://129.151.159.104:443/postPhoto', { clientID, sourceImage, targetImage })
            .then(res => {
                const endTime = Date.now();
                const requestTimeInSeconds = (endTime - startTime) / 1000;
                console.log(`Request sent in ${requestTimeInSeconds.toFixed(2)} seconds`);
                console.log(res.data);
            })
            .catch(e => {
                console.log(e);
            });
    }).catch(e => {
        console.log(e);
    });
}).catch(e => {
    console.log(e);
});
