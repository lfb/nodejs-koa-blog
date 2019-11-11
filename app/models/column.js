const moment = require('moment');
const {sequelize} = require('../../core/db')
const {Sequelize, Model} = require('sequelize')

// 定义专栏模型
class Column extends Model {

}

// 初始文章模型
Column.init({
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  // 专栏标题
  title: Sequelize.STRING,
  // 专栏作者
  author: Sequelize.STRING(64),
  // 专栏简介
  description: Sequelize.TEXT,
  // 专栏内容
  content: Sequelize.TEXT,
  // 专栏封面
  cover: Sequelize.STRING,
  // 专栏分类ID
  category_id: Sequelize.STRING,
  // 专栏章节ID
  chapter_id: Sequelize.STRING,
  // 专栏浏览次数
  browse: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  },
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
  Column
}
