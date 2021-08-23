// router 的入口文件
const Router = require('koa-router')
const user = new Router()
const bodyParser = require('koa-bodyparser')
const db = require('../utils/db');
const jwt = require('jsonwebtoken')

user.use(bodyParser());
// 登陆接口
user.post('/api/login',async (ctx)=>{
    const tel = ctx.request.body.tel;
    const pwd = ctx.request.body.password;
    let sql = `select * from users where tel='${tel}'`
    let res = await new Promise((resolve,reject)=>{
       return db.query(sql,(err,data)=>{
            if(err) throw err;
            resolve(data)
        })
    })
    if(res.length >0){
        console.log(res[0].password,pwd,11111)
        if(res[0].password === pwd){
            ctx.body = {
                code:0,
                msg:"登陆成功",
                data:res
            }
        }else{
            ctx.body = {
                code:-1,
                msg:"密码错误请重新输入",
            }
        }
    }else{
        ctx.body={
            code:-2,
            msg:"无账号去注册"
        }
    }

})
// 注册接口
user.post('/api/register',async (ctx)=>{
    console.log(ctx.request.body);
    const tel = ctx.request.body.tel;
    const pwd = ctx.request.body.password;
    let sql = `select * from users where tel='${tel}'`
    let res = await new Promise((resolve,reject)=>{
       return db.query(sql,(err,data)=>{
            if(err) throw err;
            resolve(data)
        })
    })

    if(res.length >0){

    }else{
        const token = jwt.sign({tel:tel, pwd:pwd}, 'secret', {expiresIn:'15d'})
        let insertSql = `insert into users (username, password, tel, token) values ('${tel}', '${pwd}', '${tel}', '${token}')`
        let registerRes =await  new Promise((resolve,reject)=>{
            return db.query(insertSql,(err,data)=>{
                 if(err) throw err;
                 resolve(data)
             })
         })
        ctx.body={
            code:0,
            msg:'成功',
            data:registerRes
        }
    }
})

module.exports = user;

    