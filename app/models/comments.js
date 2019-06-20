const moment = require('moment');

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
    // 评论人的名字
    nickname: Sequelize.STRING,
    // 评论人的邮箱
    email: Sequelize.STRING,
    // 评论内容
    content: Sequelize.TEXT,
    // 文章ID
    article_id: Sequelize.STRING,
    // 评论父级ID，默认为0
    parent_id: {
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
    tableName: 'comments'
})

module.exports = {
    Comments
}