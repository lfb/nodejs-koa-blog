const {UserDao} = require('../dao/user')
const {generateToken} = require('../../core/util')
const {Auth} = require('../../middlewares/auth')

class LoginManager {
    // 邮箱登录
    static async email(account, secret) {
        // 验证账号密码是否正确
        const user = await UserDao.verifyEmailPassword(account, secret);

        // 发布令牌
        return generateToken(user.id, Auth.USER)
    }
}

module.exports = {
    LoginManager
}