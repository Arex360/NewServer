const express = require('express')
const cluster = require('cluster')
const cpus = require('os').cpus.length
const process = require('process')
const bodyparser = require('body-parser')
const {entry,getImage,postImage,addTrap,getTrap} = require('./routes/routes')
const {connection} = require('./service/connection')
let startServer = ()=>{
    const app = express()
    app.use(bodyparser.urlencoded({limit:'50mb',extended:false}))
    app.use(postImage)
    app.use(getImage)
    app.use(addTrap)
    app.use(getTrap)
    app.use(entry)
    connection.connect()
    app.listen(5000,()=>console.log('server started'))
}
startServer()