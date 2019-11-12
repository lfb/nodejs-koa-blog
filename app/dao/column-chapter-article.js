const {ColumnChapterArticle} = require('../models/column-chapter-article')

// 定义专栏文章
class ColumnChapterArticleDao {

  // 创建专栏文章
  static async create(v) {
    // 检测是否存在专栏章节
    const hasColumnChapterArticle = await ColumnChapterArticle.findOne({
      where: {
        title: v.get('body.title'),
        deleted_at: null
      }
    });

    // 如果存在，抛出存在信息
    if (hasColumnChapterArticle) {
      throw new global.errs.Existing('专栏章节文章已存在');
    }

    // 创建专栏章节
    const article = new ColumnChapterArticle();
    article.title = v.get('body.title');
    article.author = v.get('body.author');
    article.description = v.get('body.description');
    article.content = v.get('body.content');
    article.cover = v.get('body.cover');
    article.browse = v.get('body.browse');
    article.column_chapter_id = v.get('body.column_chapter_id');

    article.save();
  }

  // 获取专栏章节列表
  static async list(column_chapter_id) {
    return  await ColumnChapterArticle.scope('iv').findAll({
      where: {
        column_chapter_id,
        deleted_at: null
      },
      order: [
        ['created_at', 'DESC']
      ]
    });
  }

  // 删除专栏文章
  static async destroy(id) {
    // 检测是否存在专栏文章
    const columnChapterArticle = await ColumnChapterArticle.findOne({
      where: {
        id,
        deleted_at: null
      }
    });
    // 不存在抛出错误
    if (!columnChapterArticle) {
      throw new global.errs.NotFound('没有找到相关专栏章节');

    }

    // 软删除专栏文章
    columnChapterArticle.destroy()
  }

  // 更新专栏文章
  static async update(id, v) {
    // 查询专栏
    const article = await ColumnChapterArticle.findByPk(id);
    if (!article) {
      throw new global.errs.NotFound('没有找到相关专栏文章');
    }

    // 更新章节
    article.title = v.get('body.title');
    article.author = v.get('body.author');
    article.description = v.get('body.description');
    article.content = v.get('body.content');
    article.cover = v.get('body.cover');
    article.browse = v.get('body.browse');
    article.column_chapter_id = v.get('body.column_chapter_id');

    article.save();
  }

  // 专栏章节文章详情
  static async detail(id) {
    const columnChapterArticle = await ColumnChapterArticle.findOne({
      where: {
        id
      }
    });

    if (!columnChapterArticle) {
      throw new global.errs.NotFound('没有找到相关专栏文章');
    }

    return columnChapterArticle;
  }

}

module.exports = {
  ColumnChapterArticleDao
}
