const {
    sequelize
} = require('../../core/db')

const {
    Sequelize,
    Model
} = require('sequelize')

// 定义文章模型
class Article extends Model {

}

// 初始用户模型
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


module.exports = {
    Article
}
