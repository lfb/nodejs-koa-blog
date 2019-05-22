const {Sequelize, Model} = require('sequelize')

const {sequelize} = require('../../core/db')

class Comments extends Model {

}

Comments.init({
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    // 评论内容
    content: Sequelize.STRING,
    // 用户ID
    uid: Sequelize.STRING,
    // 文章ID
    article_id: Sequelize.STRING,
    // 评论父级ID
    parent_id: {
        type: Sequelize.INTEGER,
        defaultValue: 0
    }
}, {
    sequelize,
    tableName: 'comments'
})


module.exports = {
    Comments
}