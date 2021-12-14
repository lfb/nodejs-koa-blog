const moment = require('moment');

const { DataTypes, Model } = require('sequelize')
const { sequelize } = require('@core/db')
// const { Comment } = require('@models/comment')

class Reply extends Model {

}

Reply.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    comment: '回复主键ID'
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
    comment: '回复内容'
  },
  status: {
    type: DataTypes.TINYINT,
    allowNull: true,
    defaultValue: 0,
    comment: '回复状态：0-审核中,1-审核通过,2-审核不通过'
  },
  comment_id: {
    type: DataTypes.INTEGER(10).UNSIGNED,
    allowNull: false,
    comment: '关联的评论ID'
  },
  article_id: {
    type: DataTypes.INTEGER(10).UNSIGNED,
    allowNull: false,
    comment: '关联的文章ID'
  },
  user_id: {
    type: DataTypes.INTEGER(10).UNSIGNED,
    allowNull: true,
    defaultValue: 0,
    comment: '回复用户ID,0-代表匿名回复'
  },
  email: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: 0,
    comment: '匿名评论时，填的联系邮箱'
  },
  reply_user_id: {
    type: DataTypes.INTEGER(10).UNSIGNED,
    allowNull: true,
    defaultValue: 0,
    comment: '回复对象ID,0-代表匿名回复'
  },
  created_at: {
    type: DataTypes.DATE,
    allowNull: false,
    comment: '创建时间',
    get() {
      return moment(this.getDataValue('created_at')).format('YYYY-MM-DD HH:mm:ss');
    }
  }
}, {
  sequelize,
  tableName: 'reply',
  modelName: 'reply'
})

// 一对多：评论表下拥有多个评论
// Comment.hasMany(Reply, {
//   foreignKey: 'comment_id',
//   sourceKey: 'id',
//   as: 'reply'
// })
//
// Reply.belongsTo(Comment, {
//   foreignKey: 'comment_id',
//   targetKey: 'id',
//   as: 'comment'
// })

module.exports = {
  Reply
}
