const {Category} = require('../models/category')

class CategoryDao {
  // 创建分类
  static async create(params = {}) {
    const {name, key, parent_id = 0} = params
    // 查询是否存在重复的分类
    const hasCategory = await Category.findOne({
      where: {
        key,
        deleted_at: null
      }
    });

    if (hasCategory) {
      throw new global.errs.Existing('分类已存在');
    }

    const category = new Category();
    category.name = name
    category.key = key
    category.parent_id = parent_id
    category.save();

    return {
      name: category.name,
      key: category.key,
      parent_id: category.parent_id,
      msg: '创建成功'
    }
  }


  // 删除分类
  static async destroy(id) {
    // 查询分类
    const category = await Category.findOne({
      where: {
        id,
        deleted_at: null
      }
    });
    if (!category) {
      throw new global.errs.NotFound('没有找到相关分类');

    }
    category.destroy()
  }

  // 获取分类详情
  static async detail(id) {
    const category = await Category.scope('bh').findOne({
      where: {
        id,
        deleted_at: null
      }
    });
    if (!category) {
      throw new global.errs.NotFound('没有找到相关分类');
    }

    return category
  }

  // 更新分类
  static async update(id, v) {
    const category = await Category.findByPk(id);
    if (!category) {
      throw new global.errs.NotFound('没有找到相关分类');
    }
    category.name = v.get('body.name');
    category.key = v.get('body.key');
    category.parent_id = v.get('body.parent_id');

    category.save();
  }

  // 分类列表
  static async list() {
    return await Category.scope('bh').findAll({
      where: {
        deleted_at: null
      }
    });
  }
}

module.exports = {
  CategoryDao
}
