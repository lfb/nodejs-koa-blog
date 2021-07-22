const accessKey = 'UxXRnLJnRsC3AaEII661ZgPOtmcFeaXigeKbc85O';
const secretKey = '_5m492oDojUEH-hPt02JDFNmbU2VCpMZU8UY_inv';
const qiniu = require('qiniu')
const mac = new qiniu.auth.digest.Mac(accessKey, secretKey);

const { Auth } = require('@middlewares/auth');
const AUTH_ADMIN = 16;

const { Resolve } = require('@lib/helper');
const res = new Resolve();

const Router = require('koa-router')

const router = new Router({
    prefix: '/api/v1'
})

// 创建回复
router.get('/upload/token', new Auth(AUTH_ADMIN).m,async (ctx) => {
    // console.log('mac', mac)
    const options = {
        scope: 'boblog-v2',
        expires: 7200
    };
    const putPolicy = new qiniu.rs.PutPolicy(options);
    ctx.response.status = 200;
    const data = {
        token: putPolicy.uploadToken(mac)
    }
    ctx.body = res.json(data)
})

module.exports = router

