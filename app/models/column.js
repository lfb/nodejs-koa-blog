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
  title: {
    type: Sequelize.STRING(64),
    allowNull: false,
    comment: '专栏标题'
  },
  author: {
    type: Sequelize.STRING(64),
    allowNull: true,
    defaultValue: '梁凤波',
    comment: '专栏作者'
  },
  description: {
    type: Sequelize.STRING(100),
    allowNull: false,
    comment: '专栏简介',
  },
  cover: {
    type: Sequelize.STRING(64),
    allowNull: false,
    comment: '专栏封面',
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
  modelName: 'column',
  tableName: 'column'
})

module.exports = {
  Column
}
