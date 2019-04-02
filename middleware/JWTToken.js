const jwt = require('jsonwebtoken')
const secret = require('../config/secret')
const util = require('util')
const verify = util.promisify(jwt.verify)

/**
 * 判断token是否可用
 */
module.exports = function () {
    return async function (ctx, next) {

        // 检查此次请求中是否带有 token，如果没有则抛出异常。
        const token = ctx.header.authorization;

        try {

            if (token) {
                try {
                    // 解密payload，获取用户名，邮箱和ID
                    let payload = await verify(token.split(' ')[1], secret.sign)
                    ctx.user = {
                        name: payload.name,
                        email: payload.email,
                        id: payload.id
                    }

                } catch (err) {
                    ctx.status = 401;
                    ctx.body = {
                        code: 401,
                        message: 'Token is Expired  Token已过期，需要重新登录！',
                        err
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
                    message: 'Authentication Error 需要在request头附带Authorization:Bearer [token]字段',
                    err
                }
            } else {
                ctx.status = 500;
                ctx.body = {
                    code: 500,
                    message: 'Authentication Error 身份验证错误',
                    err
                }
            }
        }
    }
}