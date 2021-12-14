const moment = require('moment');

const { DataTypes, Model } = require('sequelize')
const { sequelize } = require('@core/db')

class Comment extends Model {

}

Comment.init({
  id: {
    type: DataTypes.INTEGER(10).UNSIGNED,
    primaryKey: true,
    autoIncrement: true,
    comment: '评论主键ID'
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
    comment: '评论内容'
  },
  status: {
    type: DataTypes.TINYINT,
    allowNull: true,
    defaultValue: 0,
    comment: '评论状态：0-审核中,1-审核通过,2-审核不通过'
  },
  article_id: {
    type: DataTypes.INTEGER(10).UNSIGNED,
    allowNull: false,
    comment: '关联的评论文章ID'
  },
  user_id: {
    type: DataTypes.INTEGER(10).UNSIGNED,
    allowNull: true,
    defaultValue: 0,
    comment: '评论用户ID,0-代表匿名回复'
  },
  email: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: 0,
    comment: '匿名评论时填的邮箱'
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
  modelName: 'comment',
  tableName: 'comment'
})

module.exports = {
  Comment
}
