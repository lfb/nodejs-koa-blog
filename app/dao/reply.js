const {Reply} = require('../models/reply')
const {Comments} = require('../models/comments')

class ReplyDao {
  // 创建评论
  static async create(v) {
    // 查询文章
    const comment = await Comments.findByPk(v.get('body.comment_id'));
    if (!comment) {
      throw new global.errs.NotFound('没有找到相关评论');
    }

    const reply = new Reply();
    reply.nickname = v.get('body.nickname');
    reply.email = v.get('body.email');
    reply.content = v.get('body.content');
    reply.comment_id = v.get('body.comment_id');

    return reply.save();
  }

  // 删除评论
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

  // 获取评论详情
  static async detail(id) {
    const reply = await Reply.scope('iv').findOne({
      where: {
        id,
        deleted_at: null
      }
    });
    if (!reply) {
      throw new global.errs.NotFound('没有找到相关评论信息');
    }

    return reply
  }

  // 更新评论
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


  // 评论列表
  static async list(page = 1) {
    const pageSize = 10;
    const reply = await Reply.scope('bh').findAndCountAll({
      //每页10条
      limit: pageSize,
      offset: (page - 1) * pageSize,
      where: {
        deleted_at: null
      },
      order: [
        ['created_at', 'DESC']
      ],
      attributes: {
        exclude: ['email']
      }
    })

    return {
      data: reply.rows,
      meta: {
        current_page: parseInt(page),
        per_page: 10,
        count: reply.count,
        total: reply.count,
        total_pages: Math.ceil(reply.count / 10),
      }
    };
  }
}

module.exports = {
  ReplyDao
}
