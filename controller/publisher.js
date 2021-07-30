const Router = require('koa-router')
const router = new Router()
const callCloudFn = require('../utils/callCloudFn')
const callCloudDB = require('../utils/callCloudDB.js')
const cloudStorage = require('../utils/callCloudStorage.js')

// get post
router.get('/list', async (ctx, next) => {
    const query = `db.collection('publisher').limit(1000).orderBy('createTime', 'desc').get()`
    const res = await callCloudDB(ctx, 'databasequery', query)
    ctx.body = {
        code: 20000,
        data: res.data
    }
})

router.post('/upload', async(ctx, next)=>{
    const fileid =  await cloudStorage.upload(ctx)
    console.log(fileid)
    // 写数据库
     const query = `
         db.collection('publisher').add({
             data: {
                 fileid: '${fileid}'
             }
         })
     `
    const res = await callCloudDB(ctx, 'databaseadd', query)
    ctx.body = {
        code: 20000,
        id_list: res.id_list
    }
 })

//add
router.post('/add', async (ctx, next) => {
    const params = ctx.request.body
    const query = `db.collection('publisher').add({data: {
        avatarUrl:\"${params.avatarUrl}\",
        createTime: ${new Date().getTime()},
        nickName: \"${params.nickName}\",
        download_url: \"${params.download_url}\",
        fileid: \"${params.fileid}\",
        avatarId: \"${params.avatarId}\",
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
    const query = `db.collection('publisher').doc('${params.id}').remove()`
    const res = await callCloudDB(ctx, 'databasedelete', query)
    ctx.body = {
        code: 20000,
        data: res
    }
})

router.get('/getById', async(ctx, next)=>{
    const query = `db.collection('publisher').doc('${ctx.request.query.id}').get()`
    console.log(query)
    const res = await callCloudDB(ctx, 'databasequery', query)
    
    ctx.body = {
        code: 20000,
        data: JSON.parse(res.data)
    }
})


router.post('/update', async(ctx, next)=>{
    const params = ctx.request.body
    const query = `
        db.collection('publisher').doc('${params._id}').update({
            data: {
                avatarUrl:\"${params.avatarUrl}\",
                createTime: ${new Date().getTime()},
                nickName: \"${params.nickName}\",
                download_url: \"${params.download_url}\",
                fileid: \"${params.fileid}\",
                avatarId: \"${params.avatarId}\",
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