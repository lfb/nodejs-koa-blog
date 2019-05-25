const {UserDao} = require('../dao/user')
const {AdminDao} = require('../dao/admin')
const {generateToken} = require('../../core/util')
const {Auth} = require('../../middlewares/auth')


class LoginManager {
    // 普通用户登录
    static async userLogin(account, secret) {
        // 验证账号密码是否正确
        const user = await UserDao.verifyEmailPassword(account, secret);

        return generateToken(user.id, Auth.USER)
    }

    // 管理员登录
    static async adminLogin(account, secret) {
        // 验证账号密码是否正确
        const admin = await AdminDao.verifyEmailPassword(account, secret);

        return generateToken(admin.id, Auth.ADMIN)
    }
}

module.exports = {
    LoginManager
}