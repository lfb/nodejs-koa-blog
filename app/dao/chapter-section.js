const {ChapterSection} = require('../models/chapter-section')

// 定义专栏文章
class ChapterSectionDao {

  // 创建专栏文章
  static async create(v) {
    // 检测是否存在专栏章节
    const hasChapterSection = await ChapterSection.findOne({
      where: {
        title: v.get('body.title'),
        deleted_at: null
      }
    });

    // 如果存在，抛出存在信息
    if (hasChapterSection) {
      throw new global.errs.Existing('专栏文章已存在');
    }

    // 创建专栏专栏文章
    const section = new ChapterSection();
    section.title = v.get('body.title');
    section.author = v.get('body.author');
    section.content = v.get('body.content');
    section.column_chapter_id = v.get('body.column_chapter_id');

    section.save();
  }

  // 获取专栏文章列表
  static async list(column_chapter_id) {
    return await ChapterSection.scope('iv').findAll({
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
    const article = await ChapterSection.findOne({
      where: {
        id,
        deleted_at: null
      }
    });
    // 不存在抛出错误
    if (!article) {
      throw new global.errs.NotFound('没有找到相关专栏文章');

    }
    // 软删除专栏文章
    article.destroy()
  }

  // 更新专栏文章
  static async update(id, v) {
    // 查询专栏文章
    const section = await ChapterSection.findByPk(id);
    if (!section) {
      throw new global.errs.NotFound('没有找到相关专栏文章');
    }

    // 更新专栏文章
    section.title = v.get('body.title');
    section.author = v.get('body.author');
    section.content = v.get('body.content');
    section.column_chapter_id = v.get('body.column_chapter_id');

    section.save();
  }

  // 专栏文章详情
  static async detail(id) {
    const section = await ChapterSection.findOne({
      where: {
        id
      }
    });

    if (!section) {
      throw new global.errs.NotFound('没有找到相关专栏文章');
    }

    return section;
  }

}

module.exports = {
  ChapterSectionDao
}
