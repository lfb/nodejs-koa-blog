const moment = require('moment');
const bcrypt = require('bcryptjs')
const {sequelize} = require('../../core/db')
const {Sequelize, Model} = require('sequelize')

// 定义管理员模型
class Admin extends Model {

}

// 初始用户模型
Admin.init({
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nickname: {
    type: Sequelize.STRING(64),
    allowNull: false,
    comment: '管理员昵称'
  },
  email: {
    type: Sequelize.STRING(128),
    unique: true,
    allowNull: false,
    comment: '管理员邮箱'
  },
  password: {
    type: Sequelize.STRING,
    set(val) {
      // 加密
      const salt = bcrypt.genSaltSync(10);
      // 生成加密密码
      const psw = bcrypt.hashSync(val, salt);
      this.setDataValue("password", psw);
    },
    allowNull: false,
    comment: '管理员密码'
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
  modelName: 'admin',
  tableName: 'admin'
})


module.exports = {
  Admin
}
