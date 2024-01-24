const express = require("express");
const cors = require("cors");
const cluster = require("cluster");
const cpus = require("os").cpus.length;
const process = require("process");
const bodyparser = require("body-parser");
const path = require('path')
const fs = require('fs')
const {
  postTrapImage,
  entry,
  getImage,
  postImage,
  addTrap,
  getTrap,
  insertTempreture,
  login,
  register,
  getWeatherData,
  trapEntry,
  validate,
  getTrapImage,
  getUserProfile,
  ADDDetections,
  GETDetections,
  rmTrap,
  debugPost,
  GetTime,
  GetTrapName,
  setTrapName,
  getModelProfile,
  setModelProfile,
  postTrapImagePart,
  setTrapDisplayName,
  getTrapDisplayName
} = require("./routes/routes");
const { connection } = require("./service/connection");
let startServer = () => {
  const app = express();
  const TIMEOUT = 600000;

// Middleware function to set the timeout
  const setServerTimeout = (req, res, next) => {
    req.setTimeout(TIMEOUT, () => {
      const error = new Error('Request timeout');
      error.status = 408;
      next(error);
    });
    next();
  };
const createHtml = ({days})=>{
  return `
  
  <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>File List</title>
</head>
<body>
    <h1>Files in the "files" folder</h1>
    <ul id="fileList">
        <!-- File list will be dynamically inserted here -->
    </ul>
    <script>
        // Fetch file list dynamically and insert into the HTML
        fetch("http://mnsstrap.ddns.net:5000/fileList/${days}")
            .then(response => response.json())
            .then(data => {
                const fileList = document.getElementById("fileList");
                data.forEach(filename => {
                    const listItem = document.createElement("li");
                    const link = document.createElement("a");
                    link.href = "http://mnsstrap.ddns.net:5000/download/"+filename;
                    link.textContent = filename;
                    listItem.appendChild(link);
                    fileList.appendChild(listItem);
                });
            })
            .catch(error => console.error("Error fetching file list:", error));
    </script>
</body>
</html>

  
  `
}
// Add the middleware to the app
  app.use(setServerTimeout);
  app.use(cors());
  app.use(bodyparser.urlencoded({ limit: "50mb", extended: true }));
  app.use(express.json({ limit: "50mb" }));
  app.use(bodyparser.json());
  app.use(postImage); // image sent by the Trap {base64,client}
  app.use(getImage); // deprecated
  app.use(addTrap); // adding trap to email  {email,trapID}
  app.use(getTrap); // deprecated 
  app.use(entry); // status
  app.use(insertTempreture); // insert Image data { client, humidity, temperature, voltage, current } 
  app.use(login); // used to login user {email,password,name}
  app.use(register); // used to register user {email,password,name}
  app.use(getWeatherData); // get Trap environment  {trapID}
  app.use(trapEntry); // Profile up the trap {trapID} 
  app.use(validate); // validate the trap {trapID} 
  app.use(postTrapImage); // Inter server trap image post { trapID, path }
  app.use(getTrapImage); // Get image of trap { trapID }
  app.use(getUserProfile) // Get user profile | GET 
  app.use(ADDDetections)
  app.use(GETDetections)
  app.use(rmTrap)
  app.use(debugPost)
  app.use(GetTime)
  app.use(GetTrapName)
  app.use(setTrapName)
  app.use(setModelProfile)
  app.use(getModelProfile)
  app.use(postTrapImagePart)
  app.use(setTrapDisplayName)
  app.use(getTrapDisplayName)
  //app.use(express.static('images'));

// Define a route to fetch the file list
app.get('/fileList/:time', async (req, res) => {
  try {
      const filesFolder = path.join(__dirname, 'images');
      const timeInDays = parseInt(req.params.time, 10);

      const fileNames = fs.readdirSync(filesFolder);
      const filteredFiles = await Promise.all(
          fileNames.map(async (filename) => {
              const filePath = path.join(filesFolder, filename);
              const { birthtime } = fs.statSync(filePath);
              const fileAgeInDays = Math.floor((Date.now() - birthtime) / (1000 * 60 * 60 * 24));

              if (fileAgeInDays === timeInDays) {
                  return { filename, birthtime };
              }
          })
      );

      // Filter out undefined values and sort files by birthtime in descending order
      const sortedFiles = filteredFiles
          .filter(Boolean)
          .sort((a, b) => b.birthtime - a.birthtime);

      res.json(sortedFiles.map(file => file.filename));
  } catch (error) {
      console.error('Error fetching file list:', error);
      res.status(500).send('Internal Server Error');
  }
});

app.get('/myimages/:days',(req,res)=>{
    res.send(createHtml({days:req.params.days}))  
})

// Define a route to handle the download for each file
app.get('/download/:filename', (req, res) => {
    const filesFolder = path.join(__dirname, 'images');
    const filename = req.params.filename;
    const filePath = path.join(filesFolder, filename);

    res.sendFile(filePath, filename);
});
  //connection.connect()
  app.listen(5000, () => console.log("server started"));
};
startServer();
