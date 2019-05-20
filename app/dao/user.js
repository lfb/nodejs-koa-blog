const {User} = require('../models/user')
const bcrypt = require('bcryptjs')

// data access object
class UserDao {
    // 创建用户
    static async createUser(params) {
        return await User.create(params)
    }

    // 验证密码
    static async verifyEmailPassword(email, plainPassword) {

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
        const correct = bcrypt.compareSync(plainPassword, user.password)

        if (!correct) {
            throw new global.errs.AuthFailed('密码不正确')
        }

        return user
    }

    // 查询是否存在 openid 的小程序用户
    static async getUserByOpenid(openid) {
        // 查询用户
        const user = await User.findOne({
            where: {
                openid
            }
        })

        return user;
    }

    // 注册小程用户
    static async createUserByOpenid(openid) {
        // 查询用户
        const user = await User.create({
            openid
        })

        return user;
    }
}

module.exports = {
    UserDao
}