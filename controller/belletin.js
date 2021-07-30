const Router = require('koa-router')
const router = new Router()
const callCloudFn = require('../utils/callCloudFn')
const callCloudDB = require('../utils/callCloudDB.js')

// get post
router.get('/list', async (ctx, next) => {
    const query = `db.collection('belletin').limit(1000).orderBy('createTime', 'desc').get()`
    const res = await callCloudDB(ctx, 'databasequery', query)
    ctx.body = {
        code: 20000,
        data: res.data
    }
})

//add
router.post('/add', async (ctx, next) => {
    const params = ctx.request.body
    const query = `db.collection('belletin').add({data: {
        avatarUrl: \"${params.avatarUrl}\",
        createTime: ${new Date().getTime()},
        nickName: \"${params.nickName}\",
        title: \"${params.title}\",
        subtitle: \"${params.subtitle}\",
        content: \"${params.content.replace(/\"/g,"'").replace(/[\r\n]/g, "")}\",
        readCount: ${params.readCount},
        interest: \"${params.interest}\",
    }})`
    const res = await callCloudDB(ctx, 'databaseadd',query)
    ctx.body = {
        code: 20000,
        data: res
    }
})
router.post('/update', async(ctx, next)=>{
    const params = ctx.request.body
    const query = `
        db.collection('belletin').doc('${params._id}').update({
            data: {
                avatarUrl: \"${params.avatarUrl}\",
                createTime: ${new Date().getTime()},
                nickName: \"${params.nickName}\",
                title: \"${params.title}\",
                subtitle: \"${params.subtitle}\",
                content: \"${params.content.replace(/\"/g,"'").replace(/[\r\n]/g, "")}\",
                readCount: ${params.readCount},
                interest: \"${params.interest}\",
            }
        })
    `
    const res = await callCloudDB(ctx, 'databaseupdate', query)
    ctx.body = {
        code: 20000,
        data: res
    }
})

//del
router.get('/del', async(ctx, next)=>{
    const params = ctx.request.query
    const query = `db.collection('belletin').doc('${params.id}').remove()`
    const res = await callCloudDB(ctx, 'databasedelete', query)
    ctx.body = {
        code: 20000,
        data: res
    }
})

router.get('/getById', async(ctx, next)=>{
    const query = `db.collection('belletin').doc('${ctx.request.query.id}').get()`
    console.log(query)
    const res = await callCloudDB(ctx, 'databasequery', query)
    
    ctx.body = {
        code: 20000,
        data: JSON.parse(res.data)
    }
})

module.exports = router