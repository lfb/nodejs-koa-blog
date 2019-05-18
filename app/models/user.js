const bcrypt = require('bcryptjs')
const {sequelize} = require('../../core/db')
const {Sequelize, Model} = require('sequelize')

// 定义用户模型
class User extends Model {
    // 创建用户
    static async createUser(params) {

        return await User.createUser(params)
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

    // 查询是否存在 opendid 的小程序用户
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

// 初始用户模型
User.init({
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nickname: Sequelize.STRING,
    email: {
        type: Sequelize.STRING(128),
        unique: true
    },
    password: {
        // 扩展 设计模式 观察者模式
        // ES6 Reflect Vue3.0
        type: Sequelize.STRING,
        set(val) {
            // 加密
            const salt = bcrypt.genSaltSync(10)
            // 生成加密密码
            const psw = bcrypt.hashSync(val, salt)
            this.setDataValue("password", psw)
        }
    },
    openid: {
        type: Sequelize.STRING(64),
        unique: true
    },
}, {
    sequelize,
    tableName: 'user'
})


module.exports = {
    User
}
