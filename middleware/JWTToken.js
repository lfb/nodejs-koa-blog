const jwt = require('jsonwebtoken')
const secret = require('../config/secret')
const util = require('util')
const verify = util.promisify(jwt.verify)
const JWTPath = require('./JWTPath')


/**
 * 判断token是否可用
 */
module.exports = function () {
    return async function (ctx, next) {

        // 检测过滤的路由就不做解析JWT了
        if (JWTPath.find(item => item === ctx.request.url)) {
            await next()

            return false;
        }

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
                }
            }
            await next()

        } catch (err) {
            if (err.status === 401) {
                ctx.status = 401;
                ctx.body = {
                    code: 401,
                    err
                }
            } else {
                ctx.status = 500;
                ctx.body = {
                    code: 500,
                    err
                }
            }

        }
    }
}