const jwt = require('jsonwebtoken')
const basicAuth = require('basic-auth')

const {UserDao} = require('../dao/user')
const {generateToken} = require('../../core/util')
const {Auth} = require('../../middlewares/auth')


class userManager {
    // 邮箱登录
    static async email(account, secret) {
        // 验证账号密码是否正确
        const user = await UserDao.verifyEmailPassword(account, secret);

        return generateToken(user.id, Auth.USER)
    }

    // 验证token是否有效
    static async verifyToken(token) {
        try {
            let result = await jwt.verify(token, global.config.security.secretKey);
            return {
                id: result.id,
                nickname: result.nickname,
                email: result.email,
                verify: true
            };

        } catch (error) {
            let errMsg = error.name === 'TokenExpiredError' ? 'token已过期' : '无效的token';
            return {
                msg: errMsg,
                verify: false
            };
        }


    }
}

module.exports = {
    userManager
}