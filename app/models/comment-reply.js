const moment = require('moment');

const {Sequelize, Model} = require('sequelize')
const {sequelize} = require('../../core/db')

class CommentReply extends Model {

}

CommentReply.init({
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  comment_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    comment: '评论的ID'
  },
  reply_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    comment: '回复的ID'
  },
  // 创建时间
  created_at: {
    type: Sequelize.DATE,
    allowNull: false,
    get() {
      return moment(this.getDataValue('created_at')).format('YYYY-MM-DD');
    }
  }
}, {
  sequelize,
  tableName: 'comment_reply',
  modelName: 'comment_reply'
})
module.exports = {
  CommentReply
}
