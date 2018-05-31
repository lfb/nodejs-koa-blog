const db = require('../config/db')
const Sequelize = db.sequelize
const User = Sequelize.import('../schema/user.js')
User.sync({force: false});

class UserModel {
    /**
     * 查询用户信息
     * @param username  姓名
     * @returns {Promise.<*>}
     */
    static async findUserByName(username) {
        return await User.findOne({
            where: {
                username
            }
        })
    }

    /**
     * 创建用户
     * @param user
     * @returns {Promise<boolean>}
     */
    static async createUser(user) {
        let username = user.username,
            password = user.password;

        await User.create({
            username,
            password
        })
        return true
    }
}

module.exports = UserModel
