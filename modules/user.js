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
     * 查询用户列表
     * @returns {Promise<*>}
     */
    static async findAllUserList() {
        return await User.findAndCountAll()
    }

    /**
     * 删除用户
     * @param id listID
     * @returns {Promise.<boolean>}
     */
    static async deleteUser(id) {
        await User.destroy({
            where: {
                id,
            }
        })
        return true
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
