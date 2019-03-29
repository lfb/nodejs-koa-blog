const moment = require('moment');
module.exports = function (sequelize, DataTypes) {
    return sequelize.define('category', {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            allowNull: true,
            autoIncrement: true,
        },
        // 分类名字
        name: {
            type: DataTypes.STRING(30),
            field: 'name',
            allowNull: false
        },
        // 分类icon图标
        icon: {
            type: DataTypes.STRING(100),
            field: 'icon',
            allowNull: false
        },
        // 子分类
        parent_id: {
            type: DataTypes.INTEGER.UNSIGNED,
            field: 'parent_id',
            allowNull: false
        },
        // 权重
        z_index: {
            type: DataTypes.STRING(30),
            field: 'z_index',
            default: 1,
            allowNull: false
        },
        createdAt: {
            type: DataTypes.DATE,
            field: 'created_at',
            get() {
                return moment(this.getDataValue('createdAt')).format('YYYY-MM-DD');
            }
        },
        updatedAt: {
            field: 'updated_at',
            type: DataTypes.DATE,
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
