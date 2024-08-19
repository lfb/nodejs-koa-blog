const Koa = require('koa')
const InitManager = require('./core/init')
const parser = require('koa-bodyparser')
const cors = require('@koa/cors')
const ratelimit = require('koa-ratelimit')

const dotenv = require('dotenv')
const envFile = process.env.NODE_ENV === 'production' ? '.env.production' : '.env.development'
dotenv.config({ path: envFile })

require('module-alias/register')

const catchError = require('./middlewares/exception')

const app = new Koa()

const path = require('path')
const koaStatic = require('koa-static')
app.use(
    koaStatic(path.join(__dirname, './images'), {
        maxage: 30 * 24 * 60 * 60 * 1000, // 缓存时间，30天
        gzip: true
    })
)

app.use(cors())
app.use(catchError)
app.use(parser())

// 接口调用频率限制（Rate-Limiting）
// https://github.com/koajs/ratelimit
const db = new Map()
app.use(
    ratelimit({
        driver: 'memory',
        db: db,
        duration: 60000,
        errorMessage: 'Sometimes You Just Have to Slow Down.',
        id: ctx => ctx.ip,
        headers: {
            remaining: 'Rate-Limit-Remaining',
            reset: 'Rate-Limit-Reset',
            total: 'Rate-Limit-Total'
        },
        max: 99,
        disableHeader: false,
        whitelist: ctx => {
            // some logic that returns a boolean
        },
        blacklist: ctx => {
            // some logic that returns a boolean
        }
    })
)

InitManager.initCore(app)

let serverLogs = `
    当前环境: ${process.env.NODE_ENV}
    Node.js 已启动服务，地址: http://localhost:${process.env.NODE_PORT}
`
app.listen(process.env.NODE_PORT, () => console.log(serverLogs))

module.exports = app
