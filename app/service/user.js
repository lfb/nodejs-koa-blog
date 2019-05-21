const jwt = require('jsonwebtoken')
const basicAuth = require('basic-auth')

const {UserDao} = require('../dao/user')
const {generateToken} = require('../../core/util')
const {Auth} = require('../../middlewares/auth')


class userManager {
    // 普通用户
    static async email(account, secret) {
        // 验证账号密码是否正确
        const user = await UserDao.verifyEmailPassword(account, secret);

        return generateToken(user.id, Auth.USER)
    }
}

module.exports = {
    userManager
}