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
function query(sql, params){
    return new Promise((resolve, reject)=>{
        pool.getConnection((err, connection)=>{
            if(err){
                reject(err);
                return;
            }
            connection.query(sql,params,(err,result)=>{
                if(err){
                    reject(err);
                    return;
                }
                connection.release()
                resolve(result)
            })
        })
    })
}

exports.query = query;