const moment = require('moment');
const {sequelize} = require('../../core/db')
const {Sequelize, Model} = require('sequelize')
const {ColumnChapter} = require('../models/column-chapter')

// 定义专栏文章
class ChapterSection extends Model {

}

// 初始化专栏文章
ChapterSection.init({
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
  // 创建时间
  created_at: {
    type: Sequelize.DATE,
    allowNull: false,
    get() {
      return moment(this.getDataValue('created_at')).format('YYYY-MM-DD');
    }
  }
}, {
  sequelize,
  modelName: 'chapter_section',
  tableName: 'chapter_section'
})

// 一对多：章节表下拥有多个专栏文章
ColumnChapter.hasMany(ChapterSection, {
  foreignKey: 'column_chapter_id', sourceKey: 'id', as: 'chapter_section'
})
ChapterSection.belongsTo(ColumnChapter, {
  foreignKey: 'column_chapter_id', targetKey: 'id', as: 'column_chapter'
})

module.exports = {
  ChapterSection
}
