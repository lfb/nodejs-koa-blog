const moment = require('moment');

const {Sequelize, Model} = require('sequelize')
const {sequelize} = require('../../core/db')

class ColumnCommentsReply extends Model {

}

ColumnCommentsReply.init({
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  column_comment_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    comment: '评论的ID'
  },
  column_reply_id: {
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
  tableName: 'column_comments_reply',
  modelName: 'column_comments_reply'
})
module.exports = {
  ColumnCommentsReply
}
