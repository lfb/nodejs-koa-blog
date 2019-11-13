const {ColumnComments} = require('../models/column-comments')
const {ColumnReply} = require('../models/column-reply')

class ColumnReplyDao {
  // 创建回复评论
  static async create(v) {
    // 查询是否存在回复的评论
    const commentId = v.get('body.column_comment_id')
    const comment = await ColumnComments.findByPk(commentId);
    if (!comment) {
      throw new global.errs.NotFound('没有找到相关评论');
    }

    const reply = new ColumnReply();
    reply.nickname = v.get('body.nickname');
    reply.email = v.get('body.email');
    reply.content = v.get('body.content');
    reply.comment_id = commentId;

    return reply.save();
  }

  // 删除回复评论
  static async destroy(id) {
    const reply = await ColumnReply.findOne({
      where: {
        id,
        deleted_at: null
      }
    });
    if (!reply) {
      throw new global.errs.NotFound('没有找到相关回复评论');
    }
    reply.destroy()
  }

  // 获取回复评论详情
  static async detail(id) {
    const reply = await ColumnReply.scope('iv').findOne({
      where: {
        id,
        deleted_at: null
      }
    });
    if (!reply) {
      throw new global.errs.NotFound('没有找到相关回复评论信息');
    }

    return reply
  }

  // 更新回复评论
  static async update(id, v) {
    const reply = await ColumnReply.findByPk(id);
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
    const reply = await ColumnReply.scope('bh').findAndCountAll({
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
