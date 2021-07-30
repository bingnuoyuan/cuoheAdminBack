const Router = require('koa-router')
const router = new Router()
const callCloudFn = require('../utils/callCloudFn')
const callCloudDB = require('../utils/callCloudDB.js')

// get post
router.get('/list', async (ctx, next) => {
    const query = `db.collection('order').limit(1000).orderBy('createTime', 'desc').get()`
    const res = await callCloudDB(ctx, 'databasequery', query)
    ctx.body = {
        code: 20000,
        data: res.data
    }
})

//add
// product: \"${params.product}\",
// productId: \"${params.productId}\",
// contract: \"${params.contract.replace(/\"/g,"'").replace(/[\r\n]/g, "")}\",
// deliver: \"${params.deliver.replace(/\"/g,"'").replace(/[\r\n]/g, "")}\",
router.post('/add', async (ctx, next) => {
    const params = ctx.request.body
    const query = `db.collection('order').add({data: {
        member: \"${params.member}\",
        memberId: \"${params.memberId}\",
        memberPhoneNumber: \"${params.memberPhoneNumber}\",
        orderId: \"${new Date().getTime()}\",
        createTime: ${new Date().getTime()},
        bargain: \"${params.bargain}\",
        undeliver: \"${params.undeliver}\",
        contractInfo: ${JSON.stringify(params.contractInfo)},
        productInfo: ${JSON.stringify(params.productInfo)},
        deliverInfo: ${JSON.stringify(params.deliverInfo)},
        status: \"${params.status}\",
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
    const query = `db.collection('order').doc('${params.id}').remove()`
    const res = await callCloudDB(ctx, 'databasedelete', query)
    ctx.body = {
        code: 20000,
        data: res
    }
})

router.get('/getById', async(ctx, next)=>{
    const query = `db.collection('order').doc('${ctx.request.query.id}').get()`
    console.log(query)
    const res = await callCloudDB(ctx, 'databasequery', query)
    
    ctx.body = {
        code: 20000,
        data: JSON.parse(res.data)
    }
})


router.post('/updateOrder', async(ctx, next)=>{
    const params = ctx.request.body
    const query = `
        db.collection('order').doc('${params._id}').update({
            data: {
                member: \"${params.member}\",
                memberId: \"${params.memberId}\",
                memberPhoneNumber: \"${params.memberPhoneNumber}\",
                orderId: \"${params.orderId}\",
                createTime: ${new Date().getTime()},
                bargain: \"${params.bargain}\",
                undeliver: \"${params.undeliver}\",
                contractInfo: ${JSON.stringify(params.contractInfo)},
                productInfo: ${JSON.stringify(params.productInfo)},
                deliverInfo: ${JSON.stringify(params.deliverInfo)},
                status: \"${params.status}\",
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