const bcrypt = require('bcryptjs')

const {
    sequelize
} = require('../../core/db')

const {
    Sequelize,
    Model
} = require('sequelize')

// 定义用户模型
class User extends Model {

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
