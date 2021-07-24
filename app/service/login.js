const { AdminDao } = require('@dao/admin')
const { UserDao } = require('@dao/user')
const { generateToken } = require('@core/util')
const { Auth } = require('@middlewares/auth')


class LoginManager {
  // 管理员登录
  static async adminLogin(params) {
    const { email, password } = params
    // 验证账号密码是否正确
    const [err, admin] = await AdminDao.verify(email, password);
    if (!err) {
      return [null, generateToken(admin.id, Auth.ADMIN)]
    } else {
      return [err, null]
    }
  }

  // 用户登录
  static async userLogin(params) {
    const { email, password } = params
    // 验证账号密码是否正确
    const [err, user] = await UserDao.verify(email, password);
    if (!err) {
      return [null, generateToken(user.id, Auth.USER), user.id]
    } else {
      return [err, null]
    }
  }
}

module.exports = {
  LoginManager
}
