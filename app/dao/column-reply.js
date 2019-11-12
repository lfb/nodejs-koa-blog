const {ColumnComments} = require('../models/column-comments')
const {CommentsReply} = require('../models/comments-reply')

class ColumnReplyDao {
  // 创建评论
  static async create(v) {
    // 查询文章
    const comment = await ColumnComments.findByPk(v.get('body.column_comment_id'));
    if (!comment) {
      throw new global.errs.NotFound('没有找到相关评论');
    }

    const reply = new CommentsReply();
    reply.nickname = v.get('body.nickname');
    reply.email = v.get('body.email');
    reply.content = v.get('body.content');
    reply.comment_id = v.get('body.comment_id');

    return reply.save();
  }

  // 删除评论
  static async destroy(id) {
    const reply = await CommentsReply.findOne({
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
    const reply = await CommentsReply.scope('iv').findOne({
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
    const reply = await CommentsReply.findByPk(id);
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
    const reply = await CommentsReply.scope('bh').findAndCountAll({
      limit: pageSize,//每页10条
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
  ColumnReplyDao
}
