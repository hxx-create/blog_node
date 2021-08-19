// 使用koa 项目
const Koa = require('koa2');
const router = require('./router')
const cors = require('koa2-cors'); //跨域处理
const app = new Koa()
const port = 3000;


app.use(cors({
    origin: '*',
    maxAge: 5, //指定本次预检请求的有效期，单位为秒。
    credentials: true, //是否允许发送Cookie
    allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], //设置所允许的HTTP请求方法
    allowHeaders: ['Content-Type', 'Authorization', 'Accept'], //设置服务器支持的所有头信息字段
    exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'] //设置获取其他自定义字段
})
)
// .usr 调用router中间件
// .routes() 启动路由
// .allowedMethods : 允许任何请求（get post put）
app.use(router.routes(),router.allowedMethods())
app.listen(port, ()=>{
    console.log(`Serve is running at http://localhost:${port}`)
})