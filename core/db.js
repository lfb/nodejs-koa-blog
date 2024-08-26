const Sequelize = require('sequelize')

const dbScopes = require('@core/db-scopes')

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    dialect: 'mysql',
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    logging: false,
    timezone: '+08:00',
    define: {
        // create_time && update_time
        timestamps: true,
        // delete_time
        paranoid: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: 'deleted_at',
        // 把驼峰命名转换为下划线
        underscored: true,
        scopes: dbScopes
    }
})

// 创建模型
sequelize.sync({ force: false })

sequelize
    .authenticate()
    .then(res => {
        console.log('Connection has been established successfully.')
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err)
    })

// sequelize.query("CREATE DATABASE IF NOT EXISTS boblog DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci").then(res=>{
//   console.log('CREATE DATABASE SUCCESS!')
// }).catch(err => {
//   console.log('CREATE DATABASE FAIL!', err)
// })

module.exports = {
    sequelize
}
