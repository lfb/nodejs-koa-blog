const {ColumnCommentsReply} = require('../models/column-comments-reply')

class ColumnCommentReplyDao {
  // 新增评论回复表
  static async create(params = {}) {
    const {column_comment_id, column_reply_id} = params

    const commentsReply = new ColumnCommentsReply();
    commentsReply.column_comment_id = column_comment_id;
    commentsReply.column_reply_id = column_reply_id;

    return commentsReply.save();
  }

  // 删除评论
  static async destroy(id) {
    const commentsReply = await ColumnCommentsReply.findOne({
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

  // 获取评论详情
  static async detail(id) {
    const reply = await ColumnCommentsReply.scope('iv').findOne({
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
    const commentsReply = await ColumnCommentsReply.findByPk(id);
    if (!commentsReply) {
      throw new global.errs.NotFound('没有找到相关评论信息');
    }
    commentsReply.comment_id = v.get('body.comment_id');
    commentsReply.reply_id = v.get('body.reply_id');
    commentsReply.column_chapter_item_id = v.get('body.column_chapter_item_id');

    commentsReply.save();
  }


  // 评论列表
  static async list(page = 1) {
    const pageSize = 10;
    const commentsReply = await ColumnCommentsReply.scope('bh').findAndCountAll({
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
  ColumnCommentReplyDao
}
