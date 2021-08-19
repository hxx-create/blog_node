let mysql = require('mysql')

// 创建mysql pool 实现 mysql 的连接
let pool = mysql.createPool({
    host:"localhost",
    port:'3306',
    database:'blog',
    user:'root',
    password:'123456'
}) 

// 对数据库进行增删改查
function query(sql, callback){
    pool.getConnection((err, connection)=>{
        connection.query(sql,(err,rows)=>{
            callback(err,rows)
            connection.release()
        })
    })
}

exports.query = query;