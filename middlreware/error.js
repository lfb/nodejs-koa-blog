const jwt = require('jsonwebtoken')
const secret = require('../config/secret')
const util = require('util')
const verify = util.promisify(jwt.verify)

/**
 * 判断token是否可用
 */
module.exports = function () {
    return async function (ctx, next) {
        try {
            const token = ctx.header.authorization  // 获取jwt
            if (token) {
                let payload
                try {
                    payload = await verify(token.split(' ')[1], secret.sign)  // 解密payload，获取用户名和ID
                    ctx.user = {
                        name: payload.name,
                        id: payload.id
                    }
                } catch (err) {
                    console.log('token verify fail: ', err)
                }
            }

            console.log(`token: ${token}`)

            await next()
        } catch (err) {
            if (err.status === 401) {
                ctx.status = 401;
                ctx.body = {
                    code: 401,
                    message: '认证失败'
                }
            } else {
                err.status = 404
                ctx.body = '404'
                console.log('不服就是怼：', err)
            }
        }
    }
}
