const moment = require('moment');
const {sequelize} = require('../../core/db')
const {Sequelize, Model} = require('sequelize')

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
  // 专栏章节标题
  title: Sequelize.STRING,
  // 父章节ID
  chapter_id: Sequelize.STRING,
  // 专栏章节作者
  author: Sequelize.STRING(64),
  // 专栏章节内容
  content: Sequelize.TEXT,
  // 专栏章节封面
  cover: Sequelize.STRING,
  // 专栏章节分类ID
  category_id: Sequelize.STRING,
  // 专栏浏览次数
  browse: {
    type: Sequelize.INTEGER,
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
  modelName: 'chapter_item',
  tableName: 'chapter_item'
})

module.exports = {
  ColumnChapterItem
}
