const Koa = require('koa')
const app = new Koa()
const Router = require('koa-router')
const router = new Router()
const cors = require('koa2-cors')
const koaBody = require('koa-body')

const ENV = 'dev-ab1jv'

// 跨域
app.use(cors({
    // origin: ['http://localhost:9528'],
    // origin: ['http://bid.shqyic.com:8023'],
    credentials: true
}))

// 接收post参数解析
app.use(koaBody({
    multipart: true,
}))

app.use(async (ctx, next)=>{
    console.log('全局中间件')
    // ctx.body = 'Hello Wolrd'
    ctx.state.env = ENV
    await next()
})

const product = require('./controller/product.js')
const news = require('./controller/news.js')
const order = require('./controller/order.js')
const member = require('./controller/member.js')
const bill = require('./controller/bill.js')
const item = require('./controller/item.js')
const publisher = require('./controller/publisher.js')
const avatar = require('./controller/avatar.js')
const belletin = require('./controller/belletin.js')
const platform = require('./controller/platform.js')
const account = require('./controller/account.js')

router.use('/product', product.routes())
router.use('/news', news.routes())
router.use('/order', order.routes())
router.use('/member', member.routes())
router.use('/bill', bill.routes())
router.use('/item', item.routes())
router.use('/publisher', publisher.routes())
router.use('/avatar', avatar.routes())
router.use('/belletin', belletin.routes())
router.use('/platform', platform.routes())
router.use('/account', account.routes())

app.use(router.routes())
app.use(router.allowedMethods())



app.listen(45236, ()=>{
    console.log('服务开启在45236端口')
})

// MVC