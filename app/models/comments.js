const moment = require('moment');

const {Sequelize, Model} = require('sequelize')
const {sequelize} = require('../../core/db')
const {Article} = require('../models/article')
const {ColumnChapter} = require('../models/column-chapter')

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

// 评论关联专栏章节
ColumnChapter.hasMany(Comments, {
  foreignKey: 'column_chapter_id', sourceKey: 'id', as: 'comment'
})
Comments.belongsTo(ColumnChapter, {
  foreignKey: 'column_chapter_id', targetKey: 'id', as: 'columnChapter'
})

module.exports = {
  Comments
}
