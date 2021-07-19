/**
 * @description 用户的数据访问对象
 * @description Data Access Objects for Useristrators
 * @author 梁凤波, Peter Liang
 */

const { User } = require('@models/user')
const bcrypt = require('bcryptjs')

class UserDao {
  // 创建用用户
  static async create(params) {
    const { email, password, username } = params
    const hasUser = await User.findOne({
      where: {
        email,
        deleted_at: null
      }
    });

    if (hasUser) {
      throw new global.errs.Existing('用户已存在');
    }

    const user = new User();
    user.username = username
    user.email = email
    user.password = password

    try {
      const res = await user.save();
      const data = {
        code: 200,
        email: res.email,
        username: res.username
      }
      return [null, data]
    } catch (err) {
      return [err, null]
    }
  }

  // 验证密码
  static async verify(email, plainPassword) {

    try {
      // 查询用户是否存在
      const user = await User.findOne({
        where: {
          email
        }
      })

      if (!user) {
        throw new global.errs.AuthFailed('账号不存在')
      }

      // 验证密码是否正确
      const correct = bcrypt.compareSync(plainPassword, user.password);
      if (!correct) {
        throw new global.errs.AuthFailed('账号不存在或者密码不正确')
      }

      return [null, user]
    } catch (err) {
      return [err, null]
    }
  }

  // 查询用户信息
  static async detail(id) {
    const scope = 'bh';
    try {
      // 查询用户是否存在
      const user = await User.scope(scope).findOne({
        where: {
          id
        }
      })

      if (!user) {
        throw new global.errs.AuthFailed('账号不存在或者密码不正确')
      }

      return [null, user]
    } catch (err) {
      return [err, null]
    }
  }
}

module.exports = {
  UserDao
}
