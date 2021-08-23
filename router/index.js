// router 的入口文件
const Router = require('koa-router')
const router = new Router()
const user = require('./users')

router.use(user.routes(),user.allowedMethods())
module.exports = router;

    