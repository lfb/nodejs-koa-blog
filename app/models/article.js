const {sequelize} = require('../../core/db')
const {Sequelize, Model} = require('sequelize')
const {Category} = require('./category')

// 定义文章模型
class Article extends Model {
    // 创建文章
    static async createArticle(params) {
        return await Article.create(params)
    }

    // 文章列表
    static async list() {
        return await Article.findAll({
            // 过滤文章内容
            attributes: {
                exclude: [
                    'content',
                    'CategoryId'
                ]
            }
        })
    }

    // 文章详情
    static async detail(id) {
        return await Article.findOne({
            where: {
                id
            },
            // 把文章关联的分类也查询出来
            include: [{
                model: Category
            }]
        })
    }

}

// 初始文章模型
Article.init({
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    title: Sequelize.STRING,
    author: Sequelize.STRING(64),
    content: Sequelize.STRING(),
    cover: Sequelize.STRING,
    browse: {
        type: Sequelize.INTEGER,
        defaultValue: 0
    }
}, {
    sequelize,
    tableName: 'article'
})

// 一篇文章关联一个分类
Article.belongsTo(Category, {foreignKey: 'category_id'})
// 一个分类下关联多篇文章
Category.hasMany(Article)

module.exports = {
    Article
}
