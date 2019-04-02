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
            // 获取jwt
            const token = ctx.header.authorization
            if (token) {
                let payload
                try {
                    // 解密payload，获取用户名和ID
                    payload = await verify(token.split(' ')[1], secret.sign)
                    ctx.user = {
                        name: payload.name,
                        email: payload.email,
                        id: payload.id
                    }

                } catch (err) {
                    ctx.status = 401;
                    ctx.body = {
                        code: 401,
                        message: "Token身份无效!"
                    }

                    return false;
                }
            }
            await next()

        } catch (err) {
            if (err.status === 401) {
                ctx.status = 401;
                ctx.body = {
                    code: 401,
                    message: err
                }
            } else {
                ctx.status = 500;
                ctx.body = {
                    code: 500,
                    message: err
                }
            }

        }
    }
}