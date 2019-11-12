const {ColumnChapterItem} = require('../models/column-chapter-item')

// 定义专栏文章
class ColumnChapterItemDao {

  // 创建专栏文章
  static async createColumnChapterItem(v) {
    // 检测是否存在专栏章节
    const hasColumnChapterItem = await ColumnChapterItem.findOne({
      where: {
        title: v.get('body.title'),
        deleted_at: null
      }
    });

    // 如果存在，抛出存在信息
    if (hasColumnChapterItem) {
      throw new global.errs.Existing('专栏章节文章已存在');
    }

    // 创建专栏章节
    const columnChapterItem = new ColumnChapterItem();

    columnChapterItem.title = v.get('body.title');
    columnChapterItem.author = v.get('body.author');
    columnChapterItem.description = v.get('body.description');
    columnChapterItem.content = v.get('body.content');
    columnChapterItem.cover = v.get('body.cover');
    columnChapterItem.browse = v.get('body.browse');
    columnChapterItem.column_chapter_id = v.get('body.column_chapter_id');

    columnChapterItem.save();
  }

  // 获取专栏章节列表
  static async getColumnChapterItemList(column_chapter_id) {
    return  await ColumnChapterItem.scope('iv').findAll({
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
  static async destroyColumnChapterItem(id) {
    // 检测是否存在专栏文章
    const columnChapterItem = await ColumnChapterItem.findOne({
      where: {
        id,
        deleted_at: null
      }
    });
    // 不存在抛出错误
    if (!columnChapterItem) {
      throw new global.errs.NotFound('没有找到相关专栏章节');

    }

    // 软删除专栏文章
    columnChapterItem.destroy()
  }

  // 更新专栏文章
  static async updateColumnChapterItem(id, v) {
    // 查询专栏
    const columnChapterItem = await ColumnChapterItem.findByPk(id);
    if (!columnChapterItem) {
      throw new global.errs.NotFound('没有找到相关专栏文章');
    }

    // 更新章节
    columnChapterItem.title = v.get('body.title');
    columnChapterItem.author = v.get('body.author');
    columnChapterItem.description = v.get('body.description');
    columnChapterItem.content = v.get('body.content');
    columnChapterItem.cover = v.get('body.cover');
    columnChapterItem.browse = v.get('body.browse');
    columnChapterItem.column_chapter_id = v.get('body.column_chapter_id');

    columnChapterItem.save();
  }

  // 专栏章节文章详情
  static async getColumnChapterItemDetail(id) {
    const columnChapterItem = await ColumnChapterItem.findOne({
      where: {
        id
      }
    });

    if (!columnChapterItem) {
      throw new global.errs.NotFound('没有找到相关专栏文章');
    }

    return columnChapterItem;
  }

}

module.exports = {
  ColumnChapterItemDao
}
