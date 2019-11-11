const {Op} = require('sequelize')

const {Reply} = require('../models/reply')
const {Comments} = require('../models/comments')

class ReplyDao {
  // 创建评论
  static async createReply(v) {

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
    reply.reply_username = v.get('body.reply_username');

    return reply.save();
  }

  // 删除评论
  static async destroyReply(id) {
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
  static async getReply(id) {
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
  static async updateReply(id, v) {
    const reply = await Reply.findByPk(id);
    if (!reply) {
      throw new global.errs.NotFound('没有找到相关评论信息');
    }
    reply.nickname = v.get('body.nickname');
    reply.email = v.get('body.email');
    reply.content = v.get('body.content');
    reply.comment_id = v.get('body.comment_id');
    reply.reply_username = v.get('body.reply_username');

    reply.save();
  }


  // 评论列表
  static async getReplyList(page = 1) {
    const pageSize = 10;
    const reply = await Reply.scope('bh').findAndCountAll({
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

  // 文章下的评论
  static async getCommentReply(commentIds) {
    return await Reply.scope('bh').findAll({
      where: {
        comment_id: {
          [Op.in]: commentIds
        }
      },
      attributes: {
        exclude: ['email']
      }
    })
  }
}

module.exports = {
  ReplyDao
}
