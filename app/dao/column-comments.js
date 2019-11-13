const {ColumnChapterArticle} = require('../models/column-chapter-article')
const {ColumnComments} = require('../models/column-comments')
const {ColumnReply} = require('../models/column-reply')

class ColumnCommentsDao {
  // 创建评论
  static async create(v) {

    // 查询是否存在专栏文章
    const articleId = v.get('body.column_chapter_article_id')
    const article = await ColumnChapterArticle.findByPk(articleId);
    if (!article) {
      throw new global.errs.NotFound('没有找到相关专栏文章');
    }

    // 创建评论
    const comments = new ColumnComments();
    comments.nickname = v.get('body.nickname');
    comments.email = v.get('body.email');
    comments.content = v.get('body.content');
    comments.column_chapter_article_id = articleId;

    return comments.save();
  }

  // 删除评论
  static async destroy(id) {
    const comments = await ColumnComments.findOne({
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
    const comments = await ColumnComments.scope('iv').findOne({
      where: {
        id,
        deleted_at: null
      },
      attributes: {
        exclude: ['email', 'updated_at', 'created_at']
      },
      include: [{
        model: ColumnReply,
        as: 'columnReply',
        through: {
          attributes: {
            exclude: ['email', 'updated_at', 'created_at']
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
    const comments = await ColumnComments.findByPk(id);
    if (!comments) {
      throw new global.errs.NotFound('没有找到相关评论信息');
    }
    comments.nickname = v.get('body.nickname');
    comments.email = v.get('body.email');
    comments.content = v.get('body.content');
    comments.article_id = v.get('body.article_id');
    comments.column_chapter_article_id = v.get('body.column_chapter_article_id');

    comments.save();
  }


  // 评论列表
  static async list(page = 1) {
    const pageSize = 10;
    const comments = await ColumnComments.scope('bh').findAndCountAll({
      limit: pageSize,//每页10条
      offset: (page - 1) * pageSize,
      where: {
        deleted_at: null
      },
      attributes: {
        exclude: ['email', 'updated_at', 'created_at']
      },
      order: [
        ['created_at', 'DESC']
      ]
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

  // 获取专栏下文章的评论
  static async articleComments(column_chapter_article_id, page = 1, desc = 'created_at') {
    const pageSize = 10;

    const comments = await ColumnComments.findAndCountAll({
      where: {
        column_chapter_article_id,
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
        model: ColumnReply,
        as: 'columnReply',
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
  ColumnCommentsDao
}
