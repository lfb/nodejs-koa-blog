const db = require('../config/db')
const Sequelize = db.sequelize;
const Nav = Sequelize.import('../schema/nav.js');
Nav.sync({force: false});

class NavModel {
    /**
     * 获取导航列表
     * @returns {Promise<*>}
     */
    static async getNavlist() {
        return await Nav.findAndCountAll()
    }

    /**
     * 获取导航单条数据
     * @param id
     * @returns {Promise<Model>}
     */
    static async getNavDetail(id) {
        return await Nav.findOne({
            where: {
                id,
            },
        })
    }

    /**
     * 创建一条导航的数据
     * @param data
     * @returns {Promise<boolean>}
     */
    static async createNav(data) {
        let title_cn = data.title_cn,
            title_en = data.title_en,
            path = data.path;

        return await Nav.create({
            title_cn,
            title_en,
            path
        })
    }

    /**
     * 删除导航条
     * @param id listID
     * @returns {Promise.<boolean>}
     */
    static async deleteNav(id) {
        await Nav.destroy({
            where: {
                id,
            }
        })
        return true
    }

    /**
     * 更新导航条数据
     * @param id  用户ID
     * @param status  事项的状态
     * @returns {Promise.<boolean>}
     */
    static async updateNav(id, data) {
        let title_cn = data.title_cn,
            title_en = data.title_en,
            path = data.path;

        await Nav.update({
            title_cn,
            title_en,
            path
        }, {
            where: {
                id
            },
            fields: ['title_cn', 'title_en', 'path']
        })
        return true
    }
}

module.exports = NavModel
