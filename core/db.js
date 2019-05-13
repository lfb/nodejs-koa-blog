const Sequelize = require('sequelize')

const {
    dbName,
    host,
    port,
    user,
    password
} = require('../config/config').database

const sequelize = new Sequelize(dbName, user, password, {
    dialect: 'mysql',
    host,
    port,
    logging: true,
    timezone: '+08:00',
    define: {
        // create_time && update_time
        timestamps: true,
        // delete_time
        paranoid: true,
        createdAt: 'create_at',
        updatedAt: 'update_at',
        deletedAt: 'delete_at',
        // 把驼峰命名转换为下划线
        underscored: true
    }
})

// 创建模型
sequelize.sync({
    force: true
})

module.exports = {
    sequelize
}

// 数据迁移 SQL 更新
