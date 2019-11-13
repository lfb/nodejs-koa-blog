const {Comments} = require('../models/comments')
const {Article} = require('../models/article')
const {Reply} = require('../models/reply')

class CommentsDao {
  // 创建评论
  static async create(v) {
    // 查询文章
    const article = await Article.findByPk(v.get('body.article_id'));
    if (!article) {
      throw new global.errs.NotFound('没有找到相关文章');
    }

    const comments = new Comments();
    comments.nickname = v.get('body.nickname');
    comments.email = v.get('body.email');
    comments.content = v.get('body.content');
    comments.article_id = v.get('body.article_id');

    return comments.save();
  }

  // 删除评论
  static async destroy(id) {
    const comments = await Comments.findOne({
      where: {
        id,
        deleted_at: null
      }
    });
    if (!comments) {
      throw new global.errs.NotFound('没有找到相关评论');

    }
    comments.destroy()
  }

  // 获取评论详情
  static async detail(id) {
    const comments = await Comments.scope('iv').findOne({
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
      through: {
        attributes: {
          exclude: ['updated_at', 'created_at']
        }
      },
      attributes: {
        exclude: ['email', 'updated_at', 'deleted_at']
      }
    }]
    });
    if (!comments) {
      throw new global.errs.NotFound('没有找到相关评论信息');
    }

    return comments
  }

  // 更新评论
  static async update(id, v) {
    const comments = await Comments.findByPk(id);
    if (!comments) {
      throw new global.errs.NotFound('没有找到相关评论信息');
    }
    comments.nickname = v.get('body.nickname');
    comments.email = v.get('body.email');
    comments.content = v.get('body.content');
    comments.article_id = v.get('body.article_id');

    comments.save();
  }


  // 评论列表
  static async list(page = 1) {
    const pageSize = 10;
    const comments = await Comments.scope('bh').findAndCountAll({
      limit: pageSize,//每页10条
      offset: (page - 1) * pageSize,
      where: {
        deleted_at: null
      },
      order: [
        ['created_at', 'DESC']
      ],
      attributes: {
        exclude: ['email', 'updated_at']
      },
    })

    return {
      data: comments.rows,
      meta: {
        current_page: parseInt(page),
        per_page: 10,
        count: comments.count,
        total: comments.count,
        total_pages: Math.ceil(comments.count / 10),
      }
    };
  }

  // 文章下的评论
  static async articleComments(article_id, page = 1, desc = 'created_at') {
    const pageSize = 10;

    const comments = await Comments.findAndCountAll({
      where: {
        article_id,
        deleted_at: null
      },
      limit: pageSize,//每页10条
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
        through: {
          attributes: {
            exclude: ['updated_at', 'created_at']
          }
        },
        attributes: {
          exclude: ['email', 'updated_at', 'deleted_at']
        }
      }]
    })

    return {
      data: comments.rows,
      // 分页
      meta: {
        current_page: parseInt(page),
        per_page: 10,
        count: comments.count,
        total: comments.count,
        total_pages: Math.ceil(comments.count / 10),
      }
    };
  }
}

module.exports = {
  CommentsDao
}
