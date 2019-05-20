const {sequelize} = require('../../core/db')
const {Sequelize, Model} = require('sequelize')
const {Category} = require('./category')

// 定义文章模型
class Article extends Model {

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
Article.belongsTo(Category, {foreignKey: 'category_id'});
// 一个分类下关联多篇文章
Category.hasMany(Article);

module.exports = {
    Article
}
