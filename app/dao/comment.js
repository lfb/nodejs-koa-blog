const xss = require('xss')

const {Comment} = require('../models/comment')
const {Reply} = require('../models/reply')

class CommentDao {
  // 创建评论
  static async create(v) {
    const comment = new Comment();
    comment.nickname = xss(v.get('body.nickname'));
    comment.email = xss(v.get('body.email'));
    comment.content = xss(v.get('body.content'));
    comment.target_id = xss(v.get('body.target_id'));
    comment.target_type = xss(v.get('body.target_type'));

    return comment.save();
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
    comment.destroy()
  }

  // 获取评论详情
  static async detail(id) {
    const comment = await Comment.scope('iv').findOne({
      where: {
        id,
        deleted_at: null
      },
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
    });
    if (!comment) {
      throw new global.errs.NotFound('没有找到相关评论信息');
    }

    return comment
  }

  // 更新评论
  static async update(id, v) {
    const comment = await Comment.findByPk(id);
    if (!comment) {
      throw new global.errs.NotFound('没有找到相关评论信息');
    }
    comment.nickname = v.get('body.nickname');
    comment.email = v.get('body.email');
    comment.content = v.get('body.content');
    comment.target_id = v.get('body.target_id');
    comment.target_type = v.get('body.target_type');

    comment.save();
  }


  // 评论列表
  static async list(page = 1) {
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

    return {
      data: comment.rows,
      meta: {
        current_page: parseInt(page),
        per_page: 10,
        count: comment.count,
        total: comment.count,
        total_pages: Math.ceil(comment.count / 10),
      }
    };
  }

  // 关联目标下的评论
  static async targetComment(params = {}) {
    const {
      target_id,
      target_type,
      page = 1,
      desc = 'created_at'
    } = params;

    const pageSize = 10;
    const comment = await Comment.findAndCountAll({
      where: {
        target_type,
        target_id,
        deleted_at: null
      },
      // 每页10条
      limit: pageSize,
      offset: (page - 1) * pageSize,
      order: [
        [desc, 'DESC']
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
        current_page: parseInt(page),
        per_page: 10,
        count: comment.count,
        total: comment.count,
        total_pages: Math.ceil(comment.count / 10),
      }
    };
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
