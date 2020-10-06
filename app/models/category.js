const moment = require('moment');

const {sequelize} = require('../../core/db')
const {Sequelize, Model} = require('sequelize')

// 定义文章模型
class Category extends Model {

}

// 初始分类模型
Category.init({
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    comment: '分类名称'
  },
  key: {
    type: Sequelize.STRING,
    allowNull: false,
    comment: '分类关键字'
  },
  parent_id: {
    type: Sequelize.INTEGER,
    allowNull: true,
    defaultValue: 0,
    comment: '分类父级ID，默认为0'
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
  modelName: 'category',
  tableName: 'category'
})

module.exports = {
  Category
}
