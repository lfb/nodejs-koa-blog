const moment = require('moment');

const {Sequelize, Model} = require('sequelize')
const {sequelize} = require('../../core/db')
const {ColumnChapterArticle} = require('./column-chapter-article')

class ColumnComments extends Model {

}

ColumnComments.init({
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
  modelName: 'column_comments',
  tableName: 'column_comments'
})


// 评论关联专栏章节
ColumnChapterArticle.hasMany(ColumnComments, {
  foreignKey: 'column_chapter_article_id', sourceKey: 'id', as: 'columnComments'
})
ColumnComments.belongsTo(ColumnChapterArticle, {
  foreignKey: 'column_chapter_article_id', targetKey: 'id', as: 'columnChapterArticle'
})

module.exports = {
  ColumnComments
}
