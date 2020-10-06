
const {Comment} = require('../models/comment')
const {Reply} = require('../models/reply')
const xss = require('xss')

class CommentDao {
  // 创建评论
  static async create(v) {
    const comment = new Comment();
    comment.article_id = v.get('body.article_id');
    comment.user_id = v.get('body.user_id');
    comment.content = xss(v.get('body.content'));

    try {
      const res = await comment.save();
      return [null, res]

    }catch (err) {
      return  [err, null]
    }
  }

  // 删除评论
  static async destroy(id) {
    const comment = await Comment.findOne({
      where: {
        id,
        deleted_at: null
      }
    });
    if (!comment) {
      throw new global.errs.NotFound('没有找到相关评论');

    }
    try {
      const res = await comment.destroy()
      return [null, res]
    }catch (err) {
      return [err, null]
    }
  }

  // 获取评论详情
  static async detail(id) {
    try {
      const comment = await Comment.scope('iv').findOne({
        where: {
          id,
          deleted_at: null
        },
        attributes: {
          exclude: ['updated_at']
        },
        include: [{
          model: Reply,
          as: 'reply',
          attributes: {
            exclude: ['email', 'updated_at', 'deleted_at']
          }
        }]
      });
      if (!comment) {
        throw new global.errs.NotFound('没有找到相关评论信息');
      }
      return  [null, comment]

    }catch (err) {
      return  [err, null]
    }
  }

  // 更新评论
  static async update(id, v) {
    const comment = await Comment.findByPk(id);
    if (!comment) {
      throw new global.errs.NotFound('没有找到相关评论信息');
    }

    comment.article_id = v.get('body.article_id');
    comment.user_id = v.get('body.user_id');
    comment.status = v.get('body.status');
    comment.content = xss(v.get('body.content'));

    try {
      const res =  await comment.save();
      return [null, res]

    } catch (err) {
      return [err, null]
    }
  }


  // 评论列表
  static async list(page = 1) {
    try {
      const pageSize = 10;
      const comment = await Comment.scope('bh').findAndCountAll({
        // 每页10条
        limit: pageSize,
        offset: (page - 1) * pageSize,
        where: {
          deleted_at: null
        },
        order: [
          ['created_at', 'DESC']
        ],
        attributes: {
          exclude: ['updated_at']
        },
      })

      const data = {
        data: comment.rows,
        meta: {
          current_page: parseInt(page),
          per_page: 10,
          count: comment.count,
          total: comment.count,
          total_pages: Math.ceil(comment.count / 10),
        }
      };
      return  [null, data]

    }catch (err) {
      return  [err, null]
    }
  }

  // 关联目标下的评论
  static async targetComment(params = {}) {
    try {
      const {
        article_id,
        page = 1,
        desc = 'created_at'
      } = params;

      const pageSize = 10;
      const comment = await Comment.findAndCountAll({
        where: {
          article_id,
          deleted_at: null
        },
        // 每页10条
        limit: pageSize,
        offset: (page - 1) * pageSize,
        order: [
          [desc, 'DESC']
        ],
        attributes: {
          exclude: ['updated_at']
        },
        include: [{
          model: Reply,
          as: 'reply',
          attributes: {
            exclude: ['updated_at', 'deleted_at']
          }
        }]
      })

      const data = {
        data: comment.rows,
        // 分页
        meta: {
          current_page: parseInt(page),
          per_page: 10,
          count: comment.count,
          total: comment.count,
          total_pages: Math.ceil(comment.count / 10),
        }
      }
      return [null, data]

    }catch (err) {
      return  [err, null]
    }
  }

  // 关联目标下的所有评论
  static async AllTargetComment(params = {}) {
    const {target_id, target_type} = params;

    const comment = await Comment.findAndCountAll({
      where: {
        target_type,
        target_id,
        deleted_at: null
      },
      order: [
        ['created_at', 'DESC']
      ],
      attributes: {
        exclude: ['email', 'updated_at']
      },
      include: [{
        model: Reply,
        as: 'reply',
        attributes: {
          exclude: ['email', 'updated_at', 'deleted_at']
        }
      }]
    })
    return {
      data: comment.rows,
      // 分页
      meta: {
        total: comment.count
      }
    };
  }
}

module.exports = {
  CommentDao
}
