// router 的入口文件
const Router = require('koa-router')
const router = new Router()
const user = require('./users')
const article = require('./article')

router.use(user.routes(),user.allowedMethods())
router.use(article.routes(),article.allowedMethods())

module.exports = router;

    