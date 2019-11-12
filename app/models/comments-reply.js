const moment = require('moment');

const {Sequelize, Model} = require('sequelize')
const {sequelize} = require('../../core/db')

class CommentsReply extends Model {

}

CommentsReply.init({
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
    get() {
      return moment(this.getDataValue('created_at')).format('YYYY-MM-DD');
    }
  }
}, {
  sequelize,
  tableName: 'comments_reply',
  modelName: 'comments_reply'
})
module.exports = {
  CommentsReply
}
