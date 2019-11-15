const {Column} = require('../models/column')
const {ColumnChapter} = require('../models/column-chapter')
const {ChapterSection} = require('../models/chapter-section')

// 定义专栏模型
class ColumnDao {

  // 创建专栏
  static async create(v) {
    // 检测是否存在专栏
    const hasColumn = await Column.findOne({
      where: {
        title: v.get('body.title'),
        deleted_at: null
      }
    });

    // 如果存在，抛出存在信息
    if (hasColumn) {
      throw new global.errs.Existing('专栏已存在');
    }

    // 创建专栏
    const column = new Column();
    column.title = v.get('body.title');
    column.author = v.get('body.author');
    column.description = v.get('body.description');
    column.cover = v.get('body.cover');

    column.save();
  }

  // 获取专栏列表
  static async list(params) {
    const {
      page = 1,
      pageSize = 10,
      desc = 'created_at'
    } = params;

    // 筛选方式
    let filter = {
      deleted_at: null
    };

    const column = await Column.scope('iv').findAndCountAll({
      //每页10条
      limit: pageSize,
      offset: (page - 1) * pageSize,
      where: filter,
      order: [
        [desc, 'DESC']
      ]
    });

    return {
      data: column.rows,
      // 分页
      meta: {
        current_page: parseInt(page),
        per_page: 10,
        count: column.count,
        total: column.count,
        total_pages: Math.ceil(column.count / 10),
      }
    };
  }

  // 删除专栏
  static async destroy(id) {
    // 检测是否存在专栏
    const column = await Column.findOne({
      where: {
        id,
        deleted_at: null
      }
    });
    // 不存在抛出错误
    if (!column) {
      throw new global.errs.NotFound('没有找到相关专栏');

    }

    // 软删除专栏
    column.destroy()
  }

  // 更新专栏
  static async update(id, v) {
    // 查询专栏
    const column = await Column.findByPk(id);
    if (!column) {
      throw new global.errs.NotFound('没有找到相关文章');
    }

    // 更新专栏
    column.title = v.get('body.title');
    column.author = v.get('body.author');
    column.description = v.get('body.description');
    column.cover = v.get('body.cover');

    column.save();
  }

  // 专栏详情
  static async detail(id) {
    const column = await Column.findOne({
      where: {
        id
      },
      // 查询每篇专栏下关联的章节
      include: [{
        model: ColumnChapter,
        as: 'column_chapter',
        attributes: {
          exclude: ['deleted_at', 'updated_at']
        },
        include: [{
          model: ChapterSection,
          as: 'chapter_section',
          attributes: ['id', 'title']
        }]
      }]
    });

    if (!column) {
      throw new global.errs.NotFound('没有找到相关专栏');

    } else {
      return column;
    }
  }

  // 专栏标题
  static async title(id) {
    const column = await Column.findOne({
      where: {
        id
      },
      attributes: ['id', 'title']
    });

    if (!column) {
      throw new global.errs.NotFound('没有找到相关专栏');

    } else {
      return column;
    }
  }

}

module.exports = {
  ColumnDao
}
