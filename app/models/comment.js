const moment = require('moment');

const {Sequelize, Model} = require('sequelize')
const {sequelize} = require('@core/db')

class Comment extends Model {

}

Comment.init({
  id: {
    type: Sequelize.INTEGER(10).UNSIGNED,
    primaryKey: true,
    autoIncrement: true
  },
  content: {
    type: Sequelize.TEXT,
    allowNull: false,
    comment: '评论内容'
  },
  status: {
    type: Sequelize.TINYINT,
    allowNull: true,
    defaultValue: 0,
    comment: '评论状态：0-审核中,1-审核通过,2-审核不通过'
  },
  article_id: {
    type: Sequelize.INTEGER(10).UNSIGNED,
    allowNull: false,
    comment: '关联的评论文章id'
  },
  user_id: {
    type: Sequelize.INTEGER(10).UNSIGNED,
    allowNull: true,
    defaultValue: 0,
    comment: '评论用户id,0-代表匿名回复'
  },
  created_at: {
    type: Sequelize.DATE,
    allowNull: false,
    get() {
      return moment(this.getDataValue('created_at')).format('YYYY-MM-DD');
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
