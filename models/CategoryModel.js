const db = require('../config/db');
const Sequelize = db.sequelize;
const Category = Sequelize.import('../schema/category');
const Article = Sequelize.import('../schema/article');

Category.sync({force: false});

class CategoryModel {
    /**
     * 创建分类
     * @param data
     * @returns {Promise<*>}
     */
    static async create(data) {
        return await Category.create(data)
    }

    /**
     * 更新分类数据
     * @param id  分类ID
     * @param data  事项的状态
     * @returns {Promise.<boolean>}
     */
    static async update(id, data) {
        await Category.update(data, {
            where: {
                id
            },
            fields: ['name', 'parent_id', 'icon', 'z_index']
        });
        return true
    }

    /**
     * 获取分类列表
     * @returns {Promise<*>}
     */
    static async list() {
        return await Category.findAll({
            attributes: ['id', 'name', 'parent_id', 'icon', 'z_index'],
        })
    }

    // 查询ID分类下的所有文章
    static async article(id) {
        return await Category.findAll({
            where: {
                id,
            },
            include: [{
                model: Article
            }]
        })
    }

    /**
     * 获取分类详情数据
     * @param id  文章ID
     * @returns {Promise<Model>}
     */
    static async detail(id) {
        return await Category.findOne({
            where: {
                id,
            },
        })
    }

    /**
     * 删除分类
     * @param id
     * @returns {Promise.<boolean>}
     */
    static async delete(id) {
        await Category.destroy({
            where: {
                id,
            }
        })
        return true
    }

}

module.exports = CategoryModel
