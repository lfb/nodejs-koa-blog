const moment = require('moment');
const {sequelize} = require('@core/db')
const {Sequelize, Model} = require('sequelize')
// const {Category} = require('./category')

// 定义文章模型
class Article extends Model {

}

// 初始文章模型
Article.init({
  id: {
    type: Sequelize.INTEGER(10).UNSIGNED,
    primaryKey: true,
    autoIncrement: true,
    comment: '文章id'
  },
  title: {
    type: Sequelize.STRING(128),
    allowNull: false,
    comment: '文章标题'
  },
  description: {
    type: Sequelize.STRING,
    allowNull: false,
    comment: '文章简介'
  },
  img_url: {
    type: Sequelize.STRING,
    allowNull: false,
    comment: '文章封面图URL'
  },
  content: {
    type: Sequelize.TEXT,
    allowNull: false,
    comment: '文章内容'
  },
  jump_url: {
    type: Sequelize.STRING,
    unique: 'article_jump_url_unique',
    allowNull: false,
    comment: '根据规则生成的利于SEO的文章跳转链接'
  },
  seo_keyword: {
    type: Sequelize.STRING(128),
    allowNull: false,
    comment: '文章SEO关键字'
  },
  status: {
    type: Sequelize.TINYINT,
    allowNull: true,
    defaultValue: 1,
    comment: '文章展示状态：0-隐藏,1-正常'
  },
  sort_order: {
    type: Sequelize.INTEGER(10).UNSIGNED,
    allowNull: true,
    defaultValue: 1,
    comment: "排序编号,默认1,数值越大排越前,相等则自然排序",
  },
  browse: {
    type: Sequelize.INTEGER(10).UNSIGNED,
    allowNull: true,
    defaultValue: 0,
    comment: '文章浏览次数'
  },
  favorite_num: {
    type: Sequelize.INTEGER(10).UNSIGNED,
    allowNull: true,
    defaultValue: 0,
    comment: '文章点赞次数'
  },
  admin_id: {
    type: Sequelize.INTEGER(10).UNSIGNED,
    allowNull: false,
    comment: '发布文章的管理员id'
  },
  category_id: {
    type: Sequelize.INTEGER(10).UNSIGNED,
    allowNull: false,
    comment: '分类id'
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
// Category.hasMany(Article, {
//   foreignKey: 'category_id', sourceKey: 'id', as: 'article'
// })
// Article.belongsTo(Category, {
//   foreignKey: 'category_id', targetKey: 'id', as: 'category'
// })
//
// module.exports = {
//   Article
// }
