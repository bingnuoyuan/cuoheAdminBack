const Router = require('koa-router')
const router = new Router()
const callCloudFn = require('../utils/callCloudFn')
const callCloudDB = require('../utils/callCloudDB.js')



router.post('/billList', async (ctx, next) => {
    const query = `db.collection('bill').limit(1000).orderBy('createTime', 'desc').get()`
    const res = await callCloudDB(ctx, 'databasequery', query)
    ctx.body = {
        code: 20000,
        data: res.data
    }
})

router.post('/updateBill', async(ctx, next)=>{
    const params = ctx.request.body
    const query = `
        db.collection('bill').doc('${params._id}').update({
            data: {
                createTime: ${new Date().getTime()},
                member: \"${params.member}\",
                memberId: \"${params.memberId}\",
                memberPhoneNumber: \"${params.memberPhoneNumber}\",
                date: \"${params.date}\",
                deliverC: \"${params.deliverC}\",
                deliverNo: \"${params.deliverNo}\",
            }
        })
    `
    const res = await callCloudDB(ctx, 'databaseupdate', query)
    ctx.body = {
        code: 20000,
        data: res
    }
})

router.post('/save', async (ctx, next) => {
    const params = ctx.request.body
    const query = `db.collection('bill').add({data: {
        createTime: ${new Date().getTime()},
        member: \"${params.member}\",
        memberId: \"${params.memberId}\",
        memberPhoneNumber: \"${params.memberPhoneNumber}\",
        date: \"${params.date}\",
        deliverC: \"${params.deliverC}\",
        deliverNo: \"${params.deliverNo}\",
         
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
    const query = `db.collection('bill').doc('${params.id}').remove()`
    const res = await callCloudDB(ctx, 'databasedelete', query)
    ctx.body = {
        code: 20000,
        data: res
    }
})

router.get('/billById', async(ctx, next)=>{
    const query = `db.collection('bill').doc('${ctx.request.query.id}').get()`
    console.log(query)
    const res = await callCloudDB(ctx, 'databasequery', query)
    
    ctx.body = {
        code: 20000,
        data: JSON.parse(res.data)
    }
})

module.exports = router