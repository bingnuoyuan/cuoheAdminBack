const Router = require('koa-router')
const router = new Router()
const callCloudFn = require('../utils/callCloudFn')
const callCloudDB = require('../utils/callCloudDB.js')

// get post
router.get('/list', async (ctx, next) => {
    const query = `db.collection('product').limit(1000).orderBy('id', 'desc').get()`
    const res = await callCloudDB(ctx, 'databasequery', query)
    ctx.body = {
        code: 20000,
        data: res.data
    }
})

//add
router.post('/add', async (ctx, next) => {
    const params = ctx.request.body
    const query = `db.collection('product').add({data: {
        item: \"${params.item}\",
        pid: ${JSON.stringify(params.pid)},
        id: ${new Date().getTime()},
        brand: \"${params.brand}\",
        model: \"${params.model}\",
        name: \"${params.name}\",
        historyPrice: ${JSON.stringify(params.historyPrice)},
        detail: \"${params.detail.replace(/\"/g,"'").replace(/[\r\n]/g, "")}\",
        params: \"${params.params.replace(/\"/g,"'").replace(/[\r\n]/g, "")}\",
        deliver: \"${params.deliver.replace(/\"/g,"'").replace(/[\r\n]/g, "")}\",
    }})`
    const res = await callCloudDB(ctx, 'databaseadd',query, true)
    ctx.body = {
        code: 20000,
        data: res
    }
})

//del
router.get('/del', async(ctx, next)=>{
    const params = ctx.request.query
    const query = `db.collection('product').doc('${params.id}').remove()`
    const res = await callCloudDB(ctx, 'databasedelete', query)
    ctx.body = {
        code: 20000,
        data: res
    }
})

router.get('/getById', async(ctx, next)=>{
    const query = `db.collection('product').doc('${ctx.request.query.id}').get()`
    const res = await callCloudDB(ctx, 'databasequery', query)
    ctx.body = {
        code: 20000,
        data: JSON.parse(res.data)
    }
})

router.post('/updateProduct', async(ctx, next)=>{
    const params = ctx.request.body
    const query = `
        db.collection('product').doc('${params._id}').update({
            data: {
                item: \"${params.item}\",
                pid: ${JSON.stringify(params.pid)},
                brand: \"${params.brand}\",
                model: \"${params.model}\",
                name: \"${params.name}\",
                historyPrice: ${JSON.stringify(params.historyPrice)},
                detail: \"${params.detail.replace(/\"/g,"'").replace(/[\r\n]/g, "")}\",
                params: \"${params.params.replace(/\"/g,"'").replace(/[\r\n]/g, "")}\",
                deliver: \"${params.deliver.replace(/\"/g,"'").replace(/[\r\n]/g, "")}\",
            }
        })
    `
    // console.log('query', query)
    const res = await callCloudDB(ctx, 'databaseupdate', query)
    ctx.body = {
        code: 20000,
        data: res
    }
})

module.exports = router