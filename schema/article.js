module.exports = function (sequelize, DataTypes) {
    return sequelize.define('article', {
        // 文章ID
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true,
        },
        // 文章标题
        title: {
            type: DataTypes.TEXT,
            allowNull: false,
            field: 'title'
        },
        // 文章作者
        author: {
            type: DataTypes.STRING,
            allowNull: false,
            field: 'author'
        },
        // 文章内容
        content: {
            type: DataTypes.TEXT,
            allowNull: false,
            field: 'content'
        },
        // 文章封面
        cover: {
            type: DataTypes.STRING,
            allowNull: false,
            field: 'cover'
        },
        // 文章点赞
        star: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: 0,
            field: 'star'
        },
        // 文章是否置顶
        is_top: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
            field: 'is_top'
        },
        // 文章浏览次数
        browse: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: 0,
            field: 'browse'
        },
        // 文章分类
        category: {
            type: DataTypes.STRING,
            allowNull: false,
            field: 'category'
        }
    }, {
        // 如果为 true 则表的名称和 model 相同，即 user
        // 为 false MySQL创建的表名称会是复数 users
        // 如果指定的表名称本就是复数形式则不变
        freezeTableName: false
    })

}