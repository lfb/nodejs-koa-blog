const moment = require('moment');
const {sequelize} = require('../../core/db')
const {Sequelize, Model} = require('sequelize')

// 定义专栏章节模型
class ColumnChapter extends Model {

}

// 初始文章模型
ColumnChapter.init({
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  // 专栏ID
  column_id: Sequelize.STRING,
  // 专栏索引
  chapter_index: Sequelize.STRING,
  // 专栏标题
  chapter_title: Sequelize.STRING,
  // 创建时间
  created_at: {
    type: Sequelize.DATE,
    get() {
      return moment(this.getDataValue('created_at')).format('YYYY-MM-DD');
    }
  }
}, {
  sequelize,
  tableName: 'article'
})

module.exports = {
  ColumnChapter
}
