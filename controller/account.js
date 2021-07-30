const Router = require('koa-router')
const router = new Router()
const callCloudFn = require('../utils/callCloudFn')
const callCloudDB = require('../utils/callCloudDB.js')



router.get('/getByName', async(ctx, next)=>{
    console.log('username', ctx.request.query)
    const query = `db.collection('account').where({username: '${ctx.request.query['0']}'}).get()`
    const res = await callCloudDB(ctx, 'databasequery', query)
    ctx.body = {
        code: 20000,
        // data: res.data
        data: JSON.parse(res.data)
    }
})

module.exports = router