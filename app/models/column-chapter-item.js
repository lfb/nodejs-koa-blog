const moment = require('moment');
const {sequelize} = require('../../core/db')
const {Sequelize, Model} = require('sequelize')
const {ColumnChapter} = require('../models/column-chapter')

// 定义专栏章节子项模型
class ColumnChapterItem extends Model {

}

// 初始文章模型
ColumnChapterItem.init({
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
  modelName: 'column_chapter_item',
  tableName: 'column_chapter_item'
})

// 专栏与专栏章节关联
ColumnChapter.hasMany(ColumnChapterItem, {
  foreignKey: 'column_chapter_id', sourceKey: 'id', as: 'columnChapterItem'
})
ColumnChapterItem.belongsTo(ColumnChapter, {
  foreignKey: 'column_chapter_id', targetKey: 'id', as: 'columnChapter'
})

module.exports = {
  ColumnChapterItem
}
