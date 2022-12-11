const {connection} = require('./connection')
async function query(sql,response){
    connection.query(sql,(err,result,field)=>{
        response.send(result)
    })
}
module.exports = query