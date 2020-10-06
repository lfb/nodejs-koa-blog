const moment = require('moment');
const {sequelize} = require('../../core/db')
const {Sequelize, Model} = require('sequelize')
const {Category} = require('./category')

// 定义文章模型
class Article extends Model {

}

// 初始文章模型
Article.init({
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  title: {
    type: Sequelize.STRING(50),
    allowNull: false,
    comment: '文章标题'
  },
  author: {
    type: Sequelize.STRING(30),
    allowNull: true,
    defaultValue: '梁凤波',
    comment: '文章作者'
  },
  content: {
    type: Sequelize.TEXT,
    allowNull: false,
    comment: '文章内容'
  },
  description: {
    type: Sequelize.STRING,
    allowNull: false,
    comment: '文章简介'
  },
  keyword: {
    type: Sequelize.STRING,
    allowNull: false,
    defaultValue: 0,
    comment: '文章关键字'
  },
  cover: {
    type: Sequelize.STRING,
    allowNull: false,
    comment: '文章封面'
  },
  browse: {
    type: Sequelize.INTEGER,
    allowNull: true,
    defaultValue: 0,
    comment: '文章浏览次数'
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
  modelName: 'article',
  tableName: 'article'
})

// 文章关联分类
Category.hasMany(Article, {
  foreignKey: 'category_id', sourceKey: 'id', as: 'article'
})
Article.belongsTo(Category, {
  foreignKey: 'category_id', targetKey: 'id', as: 'category'
})

module.exports = {
  Article
}
