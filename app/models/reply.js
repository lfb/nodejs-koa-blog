const moment = require('moment');

const {Sequelize, Model} = require('sequelize')
const {sequelize} = require('../../core/db')

class Reply extends Model {

}

Reply.init({
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  // 评论人的名字
  nickname: Sequelize.STRING,
  // 评论人的邮箱
  email: Sequelize.STRING,
  // 回复内容
  content: Sequelize.TEXT,
  // 评论ID
  comment_id: Sequelize.STRING,
  // 回复用户名字
  reply_username: Sequelize.STRING,
  // 创建时间
  created_at: {
    type: Sequelize.DATE,
    get() {
      return moment(this.getDataValue('created_at')).format('YYYY-MM-DD');
    }
  }
}, {
  sequelize,
  tableName: 'reply'
})

module.exports = {
  Reply
}
