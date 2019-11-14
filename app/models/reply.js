const moment = require('moment');

const {Sequelize, Model} = require('sequelize')
const {sequelize} = require('../../core/db')
const {Comment} = require('../models/comment')
const {CommentReply} = require('./comment-reply')

class Reply extends Model {

}

Reply.init({
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nickname: {
    type: Sequelize.STRING(64),
    allowNull: false,
    comment: '回复人的名字'
  },
  email: {
    type: Sequelize.STRING(64),
    allowNull: false,
    comment: '回复人的邮箱'
  },
  content: {
    type: Sequelize.TEXT,
    allowNull: false,
    comment: '回复内容'
  },
  // 创建时间
  created_at: {
    type: Sequelize.DATE,
    get() {
      return moment(this.getDataValue('created_at')).format('YYYY-MM-DD');
    }
  }
}, {
  sequelize,
  tableName: 'reply',
  modelName: 'reply'
})

// 回复关联评论
Comment.belongsToMany(Reply, {
  foreignKey: 'comment_id',
  sourceKey: 'id',
  as: 'reply',
  through: CommentReply
})
Reply.belongsToMany(Comment, {
  foreignKey: 'reply_id',
  targetKey: 'id',
  as: 'comment',
  through: CommentReply
})

module.exports = {
  Reply
}
