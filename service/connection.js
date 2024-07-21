const mysql = require('mysql')
const connection = mysql.createConnection({
    host: '129.151.145.229',
    user: 'arex',
    password: '123',
    database: 'smart'
})
module.exports = {
    connection: connection
}