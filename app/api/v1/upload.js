const { Auth } = require('@middlewares/auth')
const AUTH_ADMIN = 16

const { Resolve } = require('@lib/helper')
const res = new Resolve()

const Router = require('koa-router')

const { handleUpload } = require('@core/upload')

const router = new Router({
    prefix: '/api/v1'
})

router.post('/upload/images', handleUpload.single('file'), new Auth(AUTH_ADMIN).m, async ctx => {
    const filename = ctx.req.file?.filename || ''

    ctx.response.status = 200
    ctx.body = res.json({
        img_path: filename,
        img_url: process.env.IMG_CDN_URL + filename
    })
})

module.exports = router
