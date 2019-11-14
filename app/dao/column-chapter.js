const {ColumnChapter} = require('../models/column-chapter')
const {ChapterSection} = require('../models/chapter-section')

// 定义专栏模型
class ColumnChapterDao {

  // 创建专栏章节
  static async create(v) {
    // 检测是否存在专栏章节
    const hasChapter = await ColumnChapter.findOne({
      where: {
        title: v.get('body.title'),
        deleted_at: null
      }
    });

    // 如果存在，抛出存在信息
    if (hasChapter) {
      throw new global.errs.Existing('专栏章节已存在');
    }

    // 创建专栏章节
    const chapter = new ColumnChapter();
    chapter.title = v.get('body.title');
    chapter.column_id = v.get('body.column_id');
    chapter.save();
  }

  // 获取专栏章节列表
  static async list(column_id) {
    return await ColumnChapter.scope('iv').findAll({
      where: {
        column_id,
        deleted_at: null
      },
      order: [
        ['created_at', 'DESC']
      ],
      include: [{
        model: ChapterSection,
        as: 'chapter_section',
        attributes: ['id', 'title']
      }]
    });
  }

  // 获取专栏章节下的文章列表
  static async articleList(column_id) {
    return await ColumnChapter.scope('iv').findAll({
      where: {
        column_id,
        deleted_at: null
      },
      order: [
        ['created_at', 'DESC']
      ],
      include: [{
        model: ChapterSection,
        as: 'chapter_section',
        attributes: ['id', 'title']
      }]
    });
  }

  // 删除专栏章节
  static async destroy(id) {
    // 检测是否存在专栏章节
    const hasChapter = await ColumnChapter.findOne({
      where: {
        id,
        deleted_at: null
      },
      order: [
        ['created_at', 'DESC']
      ],
    });
    // 不存在抛出错误
    if (!hasChapter) {
      throw new global.errs.NotFound('没有找到相关专栏章节');
    }
    // 软删除专栏
    hasChapter.destroy()
  }

  // 更新专栏章节
  static async update(id, v) {
    // 查询专栏章节
    const chapter = await ColumnChapter.findByPk(id);
    if (!chapter) {
      throw new global.errs.NotFound('没有找到相关专栏章节');
    }
    // 更新章节
    chapter.title = v.get('body.title');
    chapter.column_id = v.get('body.column_id');
    chapter.save();
  }

  // 专栏章节详情
  static async detail(id) {
    const chapter = await ColumnChapter.findOne({
      where: {
        id
      },
      include: [{
        model: ChapterSection,
        as: 'chapter_section',
        attributes: ['id', 'title']
      }]
    });

    if (!chapter) {
      throw new global.errs.NotFound('没有找到相关专栏章节');
    }
    return chapter;
  }
}

module.exports = {
  ColumnChapterDao
}
