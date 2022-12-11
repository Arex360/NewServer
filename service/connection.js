const mysql = require('mysql')
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'arex',
    password: '123',
    database: 'bee'
})
module.exports = {
    connection: connection
}