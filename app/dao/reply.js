const xss = require('xss')
const {Reply} = require('@models/reply')
const {Comment} = require('@models/comment')

class ReplyDao {
  // 创建回复
  static async create(v) {
    // 查询评论
    const comment = await Comment.findByPk(v.get('body.comment_id'));
    if (!comment) {
      throw new global.errs.NotFound('没有找到相关评论');
    }

    const reply = new Reply();
    reply.comment_id = v.get('body.comment_id');
    reply.user_id = v.get('body.user_id');
    reply.reply_user_id = v.get('body.reply_user_id');
    reply.content = xss(v.get('body.content'));

    return reply.save();
  }

  // 删除回复
  static async destroy(id) {
    const reply = await Reply.findOne({
      where: {
        id,
        deleted_at: null
      }
    });
    if (!reply) {
      throw new global.errs.NotFound('没有找到相关评论');
    }

    try {
      const res = await reply.destroy()
      return [null, res]
    }catch (err) {
      return [err, null]
    }
  }

  // 获取回复详情
  static async detail(id) {
    try {
      const reply = await Reply.scope('iv').findOne({
        where: {
          id,
          deleted_at: null
        },
        attributes: {
          exclude: ['email', 'updated_at']
        }
      });
      if (!reply) {
        throw new global.errs.NotFound('没有找到相关评论信息');
      }

      return [null, reply]
    }catch (err) {
      return [err, null]
    }
  }

  // 更新回复
  static async update(id, v) {
    const reply = await Reply.findByPk(id);
    if (!reply) {
      throw new global.errs.NotFound('没有找到相关评论信息');
    }
    reply.comment_id = v.get('body.comment_id');
    reply.user_id = v.get('body.user_id');
    reply.status = v.get('body.status');
    reply.reply_user_id = v.get('body.reply_user_id');
    reply.content = xss(v.get('body.content'));

    try {
      const res = await reply.save();
      return [null, res]
    }catch (err) {
      return [err, null]
    }
  }


  // 回复列表
  static async list(comment_id) {
    try {
      const res = await Reply.findAll({
        where: {
          comment_id,
          deleted_at: null
        },
        order: [
          ['created_at', 'DESC']
        ]
      });
      return  [null, res]

    } catch (err) {
      return  [err, null]
    }
  }
}

module.exports = {
  ReplyDao
}
