const {CommentReply} = require('../models/comment-reply')

class CommentReplyDao {
  // 新增评论回复
  static async create(params = {}) {
    const commentReply = new CommentReply();

    const {comment_id, reply_id } = params
    commentReply.comment_id = comment_id
    commentReply.reply_id = reply_id;

    return commentReply.save();
  }

  // 删除评论回复
  static async destroy(id) {
    const commentReply = await CommentReply.findOne({
      where: {
        id,
        deleted_at: null
      }
    });
    if (!commentReply) {
      throw new global.errs.NotFound('没有找到相关评论回复');
    }
    commentReply.destroy()
  }

  // 获取评论回复详情
  static async detail(id) {
    const reply = await CommentReply.scope('iv').findOne({
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

  // 更新评论回复
  static async update(id, v) {
    const commentReply = await CommentReply.findByPk(id);
    if (!commentReply) {
      throw new global.errs.NotFound('没有找到相关评论信息');
    }
    commentReply.comment_id = v.get('body.comment_id');
    commentReply.reply_id = v.get('body.reply_id');

    commentReply.save();
  }


  // 评论回复列表
  static async list(page = 1) {
    const pageSize = 10;
    const commentReply = await CommentReply.scope('bh').findAndCountAll({
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
      data: commentReply.rows,
      meta: {
        current_page: parseInt(page),
        per_page: 10,
        count: commentReply.count,
        total: commentReply.count,
        total_pages: Math.ceil(commentReply.count / 10),
      }
    };
  }
}

module.exports = {
  CommentReplyDao
}
