const {CommentsReply} = require('../models/comments-reply')

class CommentReplyDao {
  // 新增评论回复
  static async create(params = {}) {
    const {comment_id, reply_id } = params
    console.log(comment_id, reply_id)
    console.log(comment_id, reply_id)
    console.log(comment_id, reply_id)
    const commentsReply = new CommentsReply();

    commentsReply.comment_id = comment_id
    commentsReply.reply_id = reply_id;

    return commentsReply.save();
  }

  // 删除评论回复
  static async destroy(id) {
    const commentsReply = await CommentsReply.findOne({
      where: {
        id,
        deleted_at: null
      }
    });
    if (!commentsReply) {
      throw new global.errs.NotFound('没有找到相关评论回复');
    }
    commentsReply.destroy()
  }

  // 获取评论回复详情
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

  // 更新评论回复
  static async update(id, v) {
    const commentsReply = await CommentsReply.findByPk(id);
    if (!commentsReply) {
      throw new global.errs.NotFound('没有找到相关评论信息');
    }
    commentsReply.comment_id = v.get('body.comment_id');
    commentsReply.reply_id = v.get('body.reply_id');

    commentsReply.save();
  }


  // 评论回复列表
  static async list(page = 1) {
    const pageSize = 10;
    const commentsReply = await CommentsReply.scope('bh').findAndCountAll({
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
      data: commentsReply.rows,
      meta: {
        current_page: parseInt(page),
        per_page: 10,
        count: commentsReply.count,
        total: commentsReply.count,
        total_pages: Math.ceil(commentsReply.count / 10),
      }
    };
  }
}

module.exports = {
  CommentReplyDao
}
