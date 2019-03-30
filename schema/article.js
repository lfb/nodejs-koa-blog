const moment = require('moment');
module.exports = function (sequelize, DataTypes) {
    return sequelize.define('article', {
        // 文章ID
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            allowNull: true,
            autoIncrement: true,
        },
        // 文章标题
        title: {
            type: DataTypes.STRING(100),
            allowNull: false,
            field: 'title',
        },
        // 文章作者
        author: {
            type: DataTypes.STRING(30),
            allowNull: false,
            field: 'author',
        },
        // 文章介绍
        introduction: {
            type: DataTypes.STRING(255),
            allowNull: false,
            field: 'introduction'
        },
        // 文章标签
        tag: {
            type: DataTypes.STRING(100),
            allowNull: false,
            field: 'tag'
        },
        // 文章封面
        cover: {
            type: DataTypes.STRING(255),
            allowNull: false,
            field: 'cover'
        },
        // 文章内容
        content: {
            type: DataTypes.TEXT,
            allowNull: false,
            field: 'content'
        },
        // 浏览次数
        browser: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: true,
            field: 'browser',
            defaultValue: 0
        },
        // 是否软删除
        is_del: {
            type: DataTypes.BOOLEAN,
            field: 'is_del',
            allowNull: false,
            defaultValue: false
        },
        createdAt: {
            type: DataTypes.DATE,
            field: 'created_at',
            get() {
                return moment(this.getDataValue('createdAt')).format('YYYY-MM-DD');
            }
        },
        updatedAt: {
            type: DataTypes.DATE,
            field: 'updated_at',
            get() {
                return moment(this.getDataValue('updatedAt')).format('YYYY-MM-DD');
            }
        }
    }, {
        // 如果为 true 则表的名称和 model 相同，即 user
        // 为 false MySQL创建的表名称会是复数 users
        // 如果指定的表名称本就是复数形式则不变
        freezeTableName: true
    })

}