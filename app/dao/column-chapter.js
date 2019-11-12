const {ColumnChapter} = require('../models/column-chapter')

// 定义专栏模型
class ColumnChapterDao {

  // 创建专栏章节
  static async createColumnChapter(v) {
    // 检测是否存在专栏章节
    const hasColumnChapter = await ColumnChapter.findOne({
      where: {
        title: v.get('body.title'),
        deleted_at: null
      }
    });

    // 如果存在，抛出存在信息
    if (hasColumnChapter) {
      throw new global.errs.Existing('专栏章节已存在');
    }

    // 创建专栏章节
    const columnChapter = new ColumnChapter();

    columnChapter.title = v.get('body.title');
    columnChapter.index = v.get('body.index');
    columnChapter.column_id = v.get('body.column_id');

    columnChapter.save();
  }

  // 获取专栏章节列表
  static async getColumnChapterList(column_id) {
    return  await ColumnChapter.scope('iv').findAll({
      where: {
        column_id,
        deleted_at: null
      },
      order: [
        ['created_at', 'DESC']
      ],
    });
  }

  // 删除专栏
  static async destroyColumnChapter(id) {
    // 检测是否存在专栏
    const columnChapter = await ColumnChapter.findOne({
      where: {
        id,
        deleted_at: null
      },
      order: [
        ['created_at', 'DESC']
      ],
    });
    // 不存在抛出错误
    if (!columnChapter) {
      throw new global.errs.NotFound('没有找到相关专栏章节');

    }

    // 软删除专栏
    columnChapter.destroy()
  }

  // 更新专栏
  static async updateColumnChapter(id, v) {
    // 查询专栏
    const columnChapter = await ColumnChapter.findByPk(id);
    if (!columnChapter) {
      throw new global.errs.NotFound('没有找到相关专栏章节');
    }

    // 更新章节
    columnChapter.title = v.get('body.title');
    columnChapter.index = v.get('body.index');
    columnChapter.column_id = v.get('body.column_id');

    columnChapter.save();
  }

  // 专栏章节详情
  static async getColumnChapterDetail(id) {
    const columnChapter = await ColumnChapter.findOne({
      where: {
        id
      }
    });

    if (!columnChapter) {
      throw new global.errs.NotFound('没有找到相关专栏章节');
    }

    return columnChapter;
  }

}

module.exports = {
  ColumnChapterDao
}
