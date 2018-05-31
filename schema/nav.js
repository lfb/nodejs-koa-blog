module.exports = function (sequelize, DataTypes) {
    return sequelize.define('nav', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        title_cn: {
            type: DataTypes.STRING, // 指定值的类型
            allowNull: false,
            field: 'title_cn' // 指定存储在表中的键名称
        },
        title_en: {
            type: DataTypes.STRING, // 指定值的类型
            allowNull: false,
            field: 'title_en' // 指定存储在表中的键名称
        },
        path: {
            type: DataTypes.STRING, // 指定值的类型
            allowNull: false,
            field: 'path' // 指定存储在表中的键名称
        },
    }, {
        // 如果为 true 则表的名称和 model 相同，即 user
        // 为 false MySQL创建的表名称会是复数 users
        // 如果指定的表名称本就是复数形式则不变
        freezeTableName: false
    });
}
