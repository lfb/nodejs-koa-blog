const moment = require('moment');
module.exports = function (sequelize, DataTypes) {
    return sequelize.define('roles', {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        // 角色名字
        name: {
            type: DataTypes.STRING(100),
            field: 'name',
            allowNull: false
        },
        // 角色权限
        limits: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            field: 'limits',
            default: 0
        },
        createdAt: {
            type: DataTypes.DATE,
            field: 'created_id',
            get() {
                return moment(this.getDataValue('createdAt')).format('YYYY-MM-DD');
            }
        },
        updatedAt: {
            type: DataTypes.DATE,
            field: 'updated_id',
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
