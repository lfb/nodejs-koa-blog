const {sequelize} = require('../../core/db')
const {Sequelize, Model} = require('sequelize')
const {Article} = require('./article')


// 定义文章模型
class Category extends Model {
    // 创建分类
    static async createCategory(params) {
        return await Category.create(params)
    }

    // 分类列表
    static async list() {
        return await Category.findAndCountAll({
            include: [{
                model: Article,
                // 过滤文章的字段，只返回文章的id和标题即可
                attributes: {
                    exclude: [
                        'author',
                        'content',
                        'cover',
                        'browse',
                        'create_at',
                        'update_at',
                        'delete_at',
                        'category_id',
                        'CategoryId'
                    ]
                }
            }]

        })
    }

    // 关联分类的文章
    static async article(key) {
        return await Category.findAll({
            where: {
                key
            },
            include: [{
                model: Article,
                include: [{
                    model: Category
                }],
                // 过滤文章内容
                attributes: {
                    exclude: [
                        'content'
                    ]
                }
            }]
        })
    }

}

// 初始分类模型
Category.init({
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: Sequelize.STRING,
    key: Sequelize.STRING,
    parent_id: {
        type: Sequelize.INTEGER,
        defaultValue: 0
    }
}, {
    sequelize,
    tableName: 'category'
})


module.exports = {
    Category
}
