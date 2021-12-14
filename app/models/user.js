const moment = require('moment');
const bcrypt = require('bcryptjs')
const { sequelize } = require('@core/db')
const { DataTypes, Model } = require('sequelize')

// 定义用户模型
class User extends Model {

}

// 初始用户模型
User.init({
    id: {
        type: DataTypes.INTEGER(10).UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
        comment: '用户主键ID'
    },
    username: {
        type: DataTypes.STRING(50),
        allowNull: false,
        // 备注
        comment: '用户昵称'
    },
    email: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: 'user_email_unique',
        comment: '登录邮箱'
    },
    password: {
        type: DataTypes.STRING,
        set(val) {
            // 加密
            const salt = bcrypt.genSaltSync(10);
            // 生成加密密码
            const psw = bcrypt.hashSync(val, salt);
            this.setDataValue("password", psw);
        },
        allowNull: false,
        comment: '登录密码'
    },
    status: {
        type: DataTypes.TINYINT,
        allowNull: true,
        defaultValue: 1,
        comment: '用户状态:0-禁用,1-正常'
    },
    created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        comment: '创建时间',
        get() {
            return moment(this.getDataValue('created_at')).format('YYYY-MM-DD HH:mm:ss');
        }
    }
}, {
    sequelize,
    modelName: 'user',
    tableName: 'user'
})


module.exports = {
    User
}
