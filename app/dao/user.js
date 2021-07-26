/**
 * @description 用户的数据访问对象
 * @description Data Access Objects for Useristrators
 * @author 梁凤波, Peter Liang
 */
const { Op } = require('sequelize')
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
          email,
          status: 1
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
  static async detail(id, status) {
    try {
      const scope = 'bh';
      const filter = {
        id
      }
      if(status) {
        filter.status = status
      }
      // 查询用户是否存在
      const user = await User.scope(scope).findOne({
        where: filter
      })

      if (!user) {
        throw new global.errs.AuthFailed('账号不存在或者已被禁用，请联系管理员！')
      }

      return [null, user]
    } catch (err) {
      return [err, null]
    }
  }

  // 删除用户
  static async destroy(id) {
    // 检测是否存在用户
    const user = await User.findByPk(id);
    // 不存在抛出错误
    if (!user) {
      throw new global.errs.NotFound('没有找到相关用户');

    }

    try {
      // 软删除用户
      const res = await user.destroy()
      return [null, res]

    } catch (err) {
      return [err, null]
    }
  }

  // 更新用户
  static async update(id, v) {
    // 查询用户
    const user = await User.findByPk(id);
    if (!user) {
      throw new global.errs.NotFound('没有找到相关用户');
    }

    // 更新用户
      user.email = v.get('body.email')
      user.username = v.get('body.username')
      user.status = v.get('body.status')

    try {
      const res = await user.save();
      return [null, res]
    } catch (err) {
      return [err, null]
    }
  }

  static async list(query = {}) {
    const {id, email, status, username, page = 1, page_size =  10} = query
    const scop = 'bh'
    const filter = {}
    if(email) {
      filter.email = email
    }
    if(id) {
      filter.id = id
    }
    if(status) {
      filter.status = status
    }
    if(username) {
      if (username) {
        filter.username = {
          [Op.like]: `%${username}%`
        };
      }
    }
    try {
      const user = await User.scope(scop).findAndCountAll({
        where: filter,
        limit: 10,
        offset: (page - 1) * page_size,
        order: [
          ['created_at', 'DESC']
        ]
      })

      const data = {
        data: user.rows,
        // 分页
        meta: {
          current_page: parseInt(page),
          per_page: 10,
          count: user.count,
          total: user.count,
          total_pages: Math.ceil(user.count / 10),
        }
      }

      return  [null, data]

    }catch (err) {
      console.log('err', err)
      return [err, null]
    }
  }

}

module.exports = {
  UserDao
}
