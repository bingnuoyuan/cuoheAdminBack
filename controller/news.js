const Router = require('koa-router')
const router = new Router()
const callCloudFn = require('../utils/callCloudFn')
const callCloudDB = require('../utils/callCloudDB.js')

// get post
router.get('/list', async (ctx, next) => {
    const query = `db.collection('news').limit(1000).orderBy('createTime', 'desc').get()`
    const res = await callCloudDB(ctx, 'databasequery', query)
    ctx.body = {
        code: 20000,
        data: res.data
    }
})


router.post('/topNews', async (ctx, next) => {
    const query = `db.collection('newsTop').get()`
    const res = await callCloudDB(ctx, 'databasequery', query)
    ctx.body = {
        code: 20000,
        data: res.data
    }
})

//add
router.post('/topNewsadd', async (ctx, next) => {
    const params = ctx.request.body
    const query = `db.collection('newsTop').add({data: {
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
router.post('/updateNewsTop', async(ctx, next)=>{
    const params = ctx.request.body
    const query = `
        db.collection('newsTop').doc('${params._id}').update({
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

//add
router.post('/add', async (ctx, next) => {
    const params = ctx.request.body
    const query = `db.collection('news').add({data: {
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

//del
router.get('/del', async(ctx, next)=>{
    const params = ctx.request.query
    const query = `db.collection('news').doc('${params.id}').remove()`
    const res = await callCloudDB(ctx, 'databasedelete', query)
    ctx.body = {
        code: 20000,
        data: res
    }
})

router.get('/getById', async(ctx, next)=>{
    const query = `db.collection('news').doc('${ctx.request.query.id}').get()`
    console.log(query)
    const res = await callCloudDB(ctx, 'databasequery', query)
    
    ctx.body = {
        code: 20000,
        data: JSON.parse(res.data)
    }
})


router.post('/updateNews', async(ctx, next)=>{
    const params = ctx.request.body
    const query = `
        db.collection('news').doc('${params._id}').update({
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

router.post('/syncData', async(ctx, next)=>{
    const params = ctx.request.body
    const query = `
        db.collection('news').where({nickName: '${params.nickName}'}).update({
            data: {
                avatarUrl: \"${params.avatarUrl}\",
            }
        })
    `
    const res = await callCloudDB(ctx, 'databaseupdate', query)
    ctx.body = {
        code: 20000,
        data: res
    }
})

router.post('/syncDataTop', async(ctx, next)=>{
    const params = ctx.request.body
    const query = `
        db.collection('newsTop').where({nickName: '${params.nickName}'}).update({
            data: {
                avatarUrl: \"${params.avatarUrl}\",
            }
        })
    `
    const res = await callCloudDB(ctx, 'databaseupdate', query)
    ctx.body = {
        code: 20000,
        data: res
    }
})

module.exports = router