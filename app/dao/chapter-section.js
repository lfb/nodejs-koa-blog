const {ChapterSection} = require('../models/chapter-section')

// 定义章节目
class ChapterSectionDao {

  // 创建章节目
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
      throw new global.errs.Existing('章节目已存在');
    }

    // 创建专栏章节目
    const section = new ChapterSection();
    section.title = v.get('body.title');
    section.author = v.get('body.author');
    section.description = v.get('body.description');
    section.content = v.get('body.content');
    section.column_chapter_id = v.get('body.column_chapter_id');

    section.save();
  }

  // 获取章节目列表
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

  // 删除章节目
  static async destroy(id) {
    // 检测是否存在章节目
    const article = await ChapterSection.findOne({
      where: {
        id,
        deleted_at: null
      }
    });
    // 不存在抛出错误
    if (!article) {
      throw new global.errs.NotFound('没有找到相关章节目');

    }
    // 软删除章节目
    article.destroy()
  }

  // 更新章节目
  static async update(id, v) {
    // 查询章节目
    const section = await ChapterSection.findByPk(id);
    if (!section) {
      throw new global.errs.NotFound('没有找到相关章节目');
    }

    // 更新章节目
    section.title = v.get('body.title');
    section.author = v.get('body.author');
    section.description = v.get('body.description');
    section.content = v.get('body.content');
    section.column_chapter_id = v.get('body.column_chapter_id');

    section.save();
  }

  // 章节目详情
  static async detail(id) {
    const section = await ChapterSection.findOne({
      where: {
        id
      }
    });

    if (!section) {
      throw new global.errs.NotFound('没有找到相关章节目');
    }

    return section;
  }

}

module.exports = {
  ChapterSectionDao
}
