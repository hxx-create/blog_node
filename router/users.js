// router 的入口文件
const Router = require('koa-router')
const user = new Router()
const bodyParser = require('koa-bodyparser')
const db = require('../utils/db');
const jwt = require('jsonwebtoken');
const util = require('util');
const verify = util.promisify(jwt.verify)


const SECRET = 'secret'; // demo，可更换

user.use(bodyParser());
// 登陆接口
user.post('/api/user/login',async (ctx)=>{
    const tel = ctx.request.body.tel;
    const pwd = ctx.request.body.password;
    let sql = `select * from users where tel='${tel}'`
    let res = await db.query(sql)
    if(res.length >0){
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
user.post('/api/user/register',async (ctx)=>{
    const tel = ctx.request.body.tel;
    const pwd = ctx.request.body.password;
    let sql = `select * from users where tel='${tel}'`
    let res = await db.query(sql)
    if(res.length >0){
        ctx.body={
            code:-1,
            msg:'已经存在该用户',
        }
    }else{
        const token = jwt.sign({tel:tel, pwd:pwd}, 'secret', {expiresIn:'15d'})
        let insertSql = `insert into users (username, password, tel, token) values ('${tel}', '${pwd}', '${tel}', '${token}')`
        let registerRes =await db.query(insertSql)
        ctx.body={
            code:0,
            msg:'成功',
            data:registerRes
        }
    }
})

// 获取用户信息
user.get('/api/user/info', async (ctx) => {
    let token = ctx.header.authorization;
    if(token){
        let {tel}= await verify(token.split(' ')[1], SECRET) 
        let sql = `select * from users where tel='${tel}'`
        let res = await db.query(sql)
        ctx.body = {
            code:0,
            msg:"查询成功",
            data:res
        } 
    }
  });

//用户信息更新接口
user.post('/api/user/update',async(ctx) => {
    let token = ctx.header.authorization;
    if(token){
        let {tel}= await verify(token.split(' ')[1], SECRET) 
        const {username, password } = ctx.request.body;
        let updateSql =`update users set username = '${username}',password = '${password}', where id = ${tel}`;
        let user = await db.query(updateSql)
         ctx.body = {
            code:0,
            msg:"更新成功",
            data:user
        } 
    }

  })

module.exports = user;

    