const moment = require('moment');

const {Sequelize, Model} = require('sequelize')
const {sequelize} = require('../../core/db')
const {ColumnComments} = require('../models/column-comments')
const {ColumnCommentsReply} = require('./column-comments-reply')

class ColumnReply extends Model {

}

ColumnReply.init({
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
  tableName: 'column_reply',
  modelName: 'column_reply'
})

// 回复关联评论
ColumnComments.belongsToMany(ColumnReply, {
  foreignKey: 'column_comment_id',
  sourceKey: 'id',
  as: 'columnReply',
  through: ColumnCommentsReply
})
ColumnReply.belongsToMany(ColumnComments, {
  foreignKey: 'column_reply_id',
  targetKey: 'id',
  as: 'columnComments',
  through: ColumnCommentsReply
})

module.exports = {
  ColumnReply
}
