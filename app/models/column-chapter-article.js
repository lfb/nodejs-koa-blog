const moment = require('moment');
const {sequelize} = require('../../core/db')
const {Sequelize, Model} = require('sequelize')
const {ColumnChapter} = require('../models/column-chapter')

// 定义专栏文章模型
class ColumnChapterArticle extends Model {

}

// 初始化专栏文章模型
ColumnChapterArticle.init({
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  title: {
    type: Sequelize.STRING(64),
    allowNull: false,
    comment: '专栏章节标题'
  },
  author: {
    type: Sequelize.STRING(32),
    allowNull: false,
    defaultValue: '梁凤波',
    comment: '专栏章节作者'
  },
  content: {
    type: Sequelize.TEXT,
    allowNull: false,
    comment: '专栏章节内容'
  },
  cover: {
    type: Sequelize.STRING(64),
    allowNull: false,
    comment: '专栏章节封面'
  },
  browse: {
    type: Sequelize.INTEGER,
    allowNull: true,
    defaultValue: 0
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
  modelName: 'column_chapter_article',
  tableName: 'column_chapter_article'
})

// 专栏与专栏章节关联
ColumnChapter.hasMany(ColumnChapterArticle, {
  foreignKey: 'column_chapter_id', sourceKey: 'id', as: 'column_chapter_article'
})
ColumnChapterArticle.belongsTo(ColumnChapter, {
  foreignKey: 'column_chapter_id', targetKey: 'id', as: 'column_chapter'
})

module.exports = {
  ColumnChapterArticle
}
