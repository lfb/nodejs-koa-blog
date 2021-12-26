const { Op } = require('sequelize')

const { Article } = require('@models/article')
const { Category } = require('@models/category')
const { Comment } = require('@models/comment')
const { Admin } = require('@models/admin')
const { isArray, unique } = require('@lib/utils')

// 定义文章模型
class ArticleDao {

  // 创建文章
  static async create(v) {
    // 检测是否存在文章
    const title = v.get('body.title')
    const hasArticle = await Article.findOne({
      where: {
        title,
        deleted_at: null
      }
    });

    // 如果存在，抛出存在信息
    if (hasArticle) {
      throw new global.errs.Existing('文章已存在');
    }

    // 创建文章
    const article = new Article();

    article.title = title;
    article.description = v.get('body.description');
    article.img_url = v.get('body.img_url');
    article.content = v.get('body.content');
    article.seo_keyword = v.get('body.seo_keyword');
    article.status = v.get('body.status') || 1;
    article.sort_order = v.get('body.sort_order');
    article.admin_id = v.get('body.admin_id');
    article.category_id = v.get('body.category_id');

    try {
      const res = await article.save();
      return [null, res]
    } catch (err) {
      console.log(err)
      return [err, null]
    }
  }

  static async _handleAdmin(data, ids) {
    const finner = {
      where: {
        id: {}
      },
      attributes: ['id', 'email', 'nickname']
    }

    if (isArray(ids)) {
      finner.where.id = {
        [Op.in]: ids
      }
    } else {
      finner.where.id = ids
    }

    try {
      if (isArray(ids)) {
        const res = await Admin.findAll(finner)
        let admin = {}
        res.forEach(item => {
          admin[item.id] = item
        })

        data.forEach(item => {
          item.setDataValue('admin_info', admin[item.admin_id] || null)
        })
      } else {
        const res = await Admin.findOne(finner)
        data.setDataValue('admin_info', res)
      }
      return [null, data]
    } catch (err) {
      return [err, null]
    }
  }

  static async _handleCategory(data, ids) {
    const finner = {
      where: {
        id: {}
      },
      attributes: ['id', 'name']
    }
    if (isArray(ids)) {
      finner.where.id = {
        [Op.in]: ids
      }
    } else {
      finner.where.id = ids
    }

    try {
      if (isArray(ids)) {
        const res = await Category.findAll(finner)
        let category = {}
        res.forEach(item => {
          category[item.id] = item
        })

        data.forEach(item => {
          item.setDataValue('category_info', category[item.category_id] || null)
        })
      } else {
        const res = await Category.findOne(finner)
        data.setDataValue('category_info', res)
      }
      return [null, data]
    } catch (err) {
      return [err, null]
    }
  }

  // 获取文章列表
  static async list(params = {}) {
    const { category_id, keyword, page_size = 10, status, page = 1 } = params;

    // 筛选方式
    let filter = {
      deleted_at: null
    };

    // 筛选方式：存在分类ID
    if (category_id) {
      filter.category_id = category_id;
    }

    // 筛选方式：存在搜索关键字
    if (keyword) {
      filter.title = {
        [Op.like]: `%${keyword}%`
      };
    }

    if (status) {
      filter.status = status
    }
    try {
      const article = await Article.scope('iv').findAndCountAll({
        limit: page_size, //每页10条
        offset: (page - 1) * page_size,
        where: filter,
        order: [
          ['created_at', 'DESC']
        ]
      });

      let rows = article.rows

      // 处理分类
      const categoryIds = unique(rows.map(item => item.category_id))
      const [categoryError, dataAndCategory] = await ArticleDao._handleCategory(rows, categoryIds)
      if (!categoryError) {
        rows = dataAndCategory
      }

      // 处理创建人
      const adminIds = unique(rows.map(item => item.admin_id))
      const [userError, dataAndAdmin] = await ArticleDao._handleAdmin(rows, adminIds)
      if (!userError) {
        rows = dataAndAdmin
      }

      if (Array.isArray(rows) && rows.length > 0) {
        rows.sort((a, b) => b.sort_order - a.sort_order)
      }

      const data = {
        data: rows,
        // 分页
        meta: {
          current_page: parseInt(page),
          per_page: 10,
          count: article.count,
          total: article.count,
          total_pages: Math.ceil(article.count / 10),
        }
      }

      return [null, data]
    } catch (err) {
      return [err, null]
    }
  }

  // 删除文章
  static async destroy(id) {
    // 检测是否存在文章
    const article = await Article.findOne({
      where: {
        id,
        deleted_at: null
      }
    });
    // 不存在抛出错误
    if (!article) {
      throw new global.errs.NotFound('没有找到相关文章');

    }

    try {
      // 软删除文章
      const res = await article.destroy()
      return [null, res]

    } catch (err) {
      return [err, null]
    }
  }

  // 更新文章
  static async update(id, v) {
    // 查询文章
    const article = await Article.findByPk(id);
    if (!article) {
      throw new global.errs.NotFound('没有找到相关文章');
    }

    // 更新文章
    article.title = v.get('body.title');
    article.description = v.get('body.description');
    article.img_url = v.get('body.img_url');
    article.content = v.get('body.content');
    article.seo_keyword = v.get('body.seo_keyword');
    article.status = v.get('body.status');
    article.sort_order = v.get('body.sort_order');
    article.admin_id = v.get('body.admin_id');
    article.category_id = v.get('body.category_id');

    try {
      const res = await article.save();
      return [null, res]
    } catch (err) {
      return [err, null]
    }
  }

  // 更新文章浏览次数
  static async updateBrowse(id, browse) {
    // 查询文章
    const article = await Article.findByPk(id);
    if (!article) {
      throw new global.errs.NotFound('没有找到相关文章');
    }
    // 更新文章浏览
    article.browse = browse;

    try {
      const res = await article.save();
      return [null, res]
    } catch (err) {
      return [err, null]
    }
  }

  // 文章详情
  static async detail(id, query) {
    const { keyword } = query
    try {
      let filter = {
        id,
        deleted_at: null
      }

      let article = await Article.findOne({
        where: filter,
      });

      const [categoryError, dataAndCategory] = await ArticleDao._handleCategory(article, article.category_id)
      if (!categoryError) {
        article = dataAndCategory
      }

      // 处理创建人
      const [userError, dataAndAdmin] = await ArticleDao._handleAdmin(article, article.admin_id)
      if (!userError) {
        article = dataAndAdmin
      }


      if (!article) {
        throw new global.errs.NotFound('没有找到相关文章');
      }

      const comment = await Comment.findAndCountAll({
        where: {
          article_id: id,
          status: 1,
          deleted_at: null
        },
        attributes: ['id']
      })

      if (comment) {
        article.setDataValue('comment_count', comment.count || 0)
      }

      return [null, article];
    } catch (err) {
      return [err, null]
    }
  }

}

module.exports = {
  ArticleDao
}
