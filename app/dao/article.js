const {Op} = require('sequelize')

const {Article} = require('../models/article')
const {Category} = require('../models/category')

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
    article.jump_url = v.get('body.jump_url');
    article.seo_keyword = v.get('body.seo_keyword');
    article.status = v.get('body.status') || 1;
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

  // 获取文章列表
  static async list(params = {}) {
    const {category_id, keyword, status, page = 1} = params;
    const pageSize = 10

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
    const article = await Article.scope('iv').findAndCountAll({
      limit: pageSize, //每页10条
      offset: (page - 1) * pageSize,
      where: filter,
      order: [
        ['created_at', 'DESC']
      ],
      // 查询每篇文章下关联的分类
      // include: [{
      //   model: Category,
      //   as: 'category',
      //   attributes: {
      //     exclude: ['deleted_at', 'updated_at']
      //   }
      // }]
    });

    return {
      data: article.rows,
      // 分页
      meta: {
        current_page: parseInt(page),
        per_page: 10,
        count: article.count,
        total: article.count,
        total_pages: Math.ceil(article.count / 10),
      }
    };
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
    article.jump_url = v.get('body.jump_url');
    article.seo_keyword = v.get('body.seo_keyword');
    article.status = v.get('body.status') || 1;
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
  static async detail(id) {
    try {
      const article = await Article.findOne({
        where: {
          id,
          deleted_at: null
        },
        // 查询每篇文章下关联的分类
        // include: [{
        //   model: Category,
        //   as: 'category',
        //   attributes: {
        //     exclude: ['deleted_at', 'updated_at']
        //   }
        // }]
      });

      if (!article) {
        throw new global.errs.NotFound('没有找到相关文章');
      }

      return [null , article];
    }catch (err) {
      return  [err, null]
    }
  }

}

module.exports = {
  ArticleDao
}
