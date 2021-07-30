const Router = require('koa-router')
const router = new Router()
const callCloudFn = require('../utils/callCloudFn')
const callCloudDB = require('../utils/callCloudDB.js')

// get post
router.get('/list', async (ctx, next) => {
    const query = `db.collection('member').limit(1000).orderBy('versions', 'desc').get()`
    const res = await callCloudDB(ctx, 'databasequery', query)
    ctx.body = {
        code: 20000,
        data: res.data
    }
})

//del
router.get('/del', async(ctx, next)=>{
    const params = ctx.request.query
    const query = `db.collection('member').doc('${params.id}').remove()`
    const res = await callCloudDB(ctx, 'databasedelete', query)
    ctx.body = {
        code: 20000,
        data: res
    }
})

router.get('/getById', async(ctx, next)=>{
    const query = `db.collection('member').doc('${ctx.request.query.id}').get()`
    console.log(query)
    const res = await callCloudDB(ctx, 'databasequery', query)
    
    ctx.body = {
        code: 20000,
        data: JSON.parse(res.data)
    }
})


router.post('/updateMember', async(ctx, next)=>{
    const params = ctx.request.body
    const query = `
        db.collection('member').doc('${params._id}').update({
            data: {
                userinfo: {
                    nickName: \"${params.nickName}\",
                    level: \"${params.level}\",
                    remark: \"${params.remark}\"
                }
            }
        })`
    const res = await callCloudDB(ctx, 'databaseupdate', query)
    ctx.body = {
        code: 20000,
        data: res
    }
})

module.exports = router