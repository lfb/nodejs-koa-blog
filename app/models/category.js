const {
    sequelize
} = require('../../core/db')

const {
    Sequelize,
    Model
} = require('sequelize')

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
    name: Sequelize.STRING,
    key: Sequelize.STRING,
    parent_id: {
        type: Sequelize.INTEGER,
        defaultValue: 0
    }
}, {
    sequelize,
    tableName: 'category'
})


module.exports = {
    Category
}
