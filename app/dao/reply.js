const xss = require('xss')
const {Reply} = require('../models/reply')
const {Comment} = require('../models/comment')

class ReplyDao {
  // 创建回复
  static async create(v) {
    // 查询评论
    const comment = await Comment.findByPk(v.get('body.comment_id'));
    if (!comment) {
      throw new global.errs.NotFound('没有找到相关评论');
    }

    const reply = new Reply();
    reply.nickname = xss(v.get('body.nickname'));
    reply.email = xss(v.get('body.email'));
    reply.content = xss(v.get('body.content'));
    reply.comment_id = xss(v.get('body.comment_id'));

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
    reply.destroy()
  }

  // 获取回复详情
  static async detail(id) {
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

    return reply
  }

  // 更新回复
  static async update(id, v) {
    const reply = await Reply.findByPk(id);
    if (!reply) {
      throw new global.errs.NotFound('没有找到相关评论信息');
    }
    reply.nickname = v.get('body.nickname');
    reply.email = v.get('body.email');
    reply.content = v.get('body.content');
    reply.comment_id = v.get('body.comment_id');

    reply.save();
  }


  // 回复列表
  static async list(comment_id) {
    return await Reply.findAll({
      where: {
        comment_id,
        deleted_at: null
      },
      order: [
        ['created_at', 'DESC']
      ]
    });
  }
}

module.exports = {
  ReplyDao
}
