const moment = require('moment');

const { sequelize } = require('@core/db')
const { Model, DataTypes } = require('sequelize')

// 定义文章模型
class Category extends Model {

}

// 初始分类模型
Category.init({
  id: {
    type: DataTypes.INTEGER(10).UNSIGNED,
    primaryKey: true,
    autoIncrement: true,
    comment: '分类主键ID'
  },
  name: {
    type: DataTypes.STRING(50),
    allowNull: false,
    comment: '分类名称'
  },
  status: {
    type: DataTypes.TINYINT,
    allowNull: true,
    defaultValue: 1,
    comment: "类别状态,0-隐藏,1-正常",
  },
  sort_order: {
    type: DataTypes.INTEGER(10).UNSIGNED,
    allowNull: true,
    defaultValue: 1,
    comment: "排序编号",
  },
  parent_id: {
    type: DataTypes.INTEGER(10).UNSIGNED,
    allowNull: true,
    defaultValue: 0,
    comment: '父类别id,id=0代表根节点'
  },
  created_at: {
    type: DataTypes.DATE,
    allowNull: false,
    comment: '创建时间',
    get() {
      return moment(this.getDataValue('created_at')).format('YYYY-MM-DD HH:mm:ss');
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
