const moment = require('moment');
const {sequelize} = require('../../core/db')
const {Sequelize, Model} = require('sequelize')

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
    // 文章标题
    title: Sequelize.STRING,
    // 文章作者
    author: Sequelize.STRING(64),
    // 文章内容
    content: Sequelize.TEXT,
    // 文章封面
    cover: Sequelize.STRING,
    // 文章分类ID
    category_id: Sequelize.STRING,
    // 文章浏览次数
    browse: {
        type: Sequelize.INTEGER,
        defaultValue: 0
    },
    created_at: {
        type: Sequelize.DATE,
        get() {
            return moment(this.getDataValue('created_at')).format('YYYY-MM-DD');
        }
    }
}, {
    sequelize,
    tableName: 'article'
})

module.exports = {
    Article
}
