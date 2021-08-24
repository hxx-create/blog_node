// router 的入口文件
const Router = require('koa-router')
const article = new Router()
const bodyParser = require('koa-bodyparser')
const db = require('../utils/db');

article.use(bodyParser());
/* 获取全部文章接口 */
article.get('/api/article/allList', async (ctx) => {
    let{curPage,pageSize,type} = ctx.request.body;
    if(!type){
        //  type为空则返回技术文章
        var start = (curPage - 1) * pageSize;
        // 获取所有博客的数量
        let numSql = `select * from article where type = 0`;
        start = 0;
        pageSize = 10;
        var sql = `select id,title,content,
        class_name01,class_name02,class_name03,type,pic_url,like_count,
        create_time FROM article where type = 0 limit ${start}, ${pageSize}`;
        let numRes = await db.query(numSql)
        total = numRes.length
    }
    let result = await db.query(sql)
    ctx.body = {
        code:0,
        msg:"查询成功",
        data:result,total
    } 
  });
/* 删除文章接口 */
article.post('/api/article/delete', async (ctx) => {
    let token = ctx.header.authorization;
    if(token){
        let{ article_id} = ctx.request.body;
        let sql = `delete from article where id = ${article_id}`
        let result = await db.query(sql)
        ctx.body = {
            code:0,
            msg:"删除成功",
            data:null
        } 
    }
  });

  /* 文章详情接口 */
article.get('/api/article/detail', async (ctx) => {

    let{ article_id} = ctx.request.query;
    let sql = `select * from article where id = ${article_id}`
    let result = await db.query(sql)
    ctx.body = {
        code:0,
        msg:"获取成功",
        data:result
    } 
});

  /* 文章详情接口 */
  article.post('/api/article/add', async (ctx) => {
    let token = ctx.header.authorization;
    if(token){
        let {title,content,classname01,classname02,classname03,type,pic_url}  = ctx.request.body;
        let sql = `insert into article(title,content,user_id,
            classify_id01,classify_id02,classify_id03,
            class_name01,class_name02,class_name03,
            type,pic_url,
            create_time)values('${title}','',?,?,?,?,?,?,?,?,?,localtime)`
        let result = await db.query(sql)
        ctx.body = {
            code:0,
            msg:"获取成功",
            data:result
        } 
    }
});
module.exports = article;

