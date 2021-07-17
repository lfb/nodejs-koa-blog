const moment = require('moment');

const {Sequelize, Model} = require('sequelize')
const {sequelize} = require('@core/db')
const {Comment} = require('@models/comment')

class Reply extends Model {

}

Reply.init({
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    comment: '回复id'
  },
  content: {
    type: Sequelize.TEXT,
    allowNull: false,
    comment: '回复内容'
  },
  status: {
    type: Sequelize.TINYINT,
    allowNull: true,
    defaultValue: 0,
    comment: '回复状态：0-审核中,1-审核通过,2-审核不通过'
  },
  comment_id: {
    type: Sequelize.INTEGER(10).UNSIGNED,
    allowNull: false,
    comment: '关联的评论id'
  },
  user_id: {
    type: Sequelize.INTEGER(10).UNSIGNED,
    allowNull: true,
    defaultValue: 0,
    comment: '回复用户id,0-代表匿名回复'
  },
  reply_user_id: {
    type: Sequelize.INTEGER(10).UNSIGNED,
    allowNull: true,
    defaultValue: 0,
    comment: '回复对象id,0-代表匿名回复'
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

// 一对多：评论表下拥有多个评论
Comment.hasMany(Reply, {
  foreignKey: 'comment_id',
  sourceKey: 'id',
  as: 'reply'
})

Reply.belongsTo(Comment, {
  foreignKey: 'comment_id',
  targetKey: 'id',
  as: 'comment'
})

module.exports = {
  Reply
}
