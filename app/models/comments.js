const moment = require('moment');

const {Sequelize, Model} = require('sequelize')
const {sequelize} = require('../../core/db')
const {Article} = require('../models/article')

class Comments extends Model {

}

Comments.init({
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nickname: {
    type: Sequelize.STRING(64),
    allowNull: false,
    comment: '评论人的名字'
  },
  email: {
    type: Sequelize.STRING(64),
    allowNull: false,
    comment: '评论人的邮箱'
  },
  content: {
    type: Sequelize.TEXT,
    allowNull: false,
    comment: '评论内容'
  },
  parent_id: {
    type: Sequelize.INTEGER,
    allowNull: true,
    defaultValue: 0,
    comment: '评论父级ID，默认为0'
  },
  created_at: {
    type: Sequelize.DATE,
    get() {
      return moment(this.getDataValue('created_at')).format('YYYY-MM-DD');
    }
  }
}, {
  sequelize,
  modelName: 'comments',
  tableName: 'comments'
})

// 评论关联文章
Article.hasMany(Comments, {
  foreignKey: 'article_id', sourceKey: 'id', as: 'comment'
})
Comments.belongsTo(Article, {
  foreignKey: 'article_id', targetKey: 'id', as: 'article'
})

module.exports = {
  Comments
}
