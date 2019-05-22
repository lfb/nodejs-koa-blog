const {Sequelize, Model} = require('sequelize')

const {sequelize} = require('../../core/db')

const {User} = require('./user')

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

Comments.belongsTo(User, {foreignKey: 'user_id'});
User.hasMany(Comments);


module.exports = {
    Comments
}