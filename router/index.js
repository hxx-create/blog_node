// router 的入口文件
const Router = require('koa-router')
const router = new Router()

router.get('/',async (ctx)=>{
    ctx.body = "shouye"
})
router.get('/api/book/list', async(ctx)=>{
    ctx.body = "book/list"
})

module.exports = router;