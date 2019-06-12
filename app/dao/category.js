const {Category} = require('../models/category')
const {Article} = require('../models/article')

class CategoryDao {
    // 创建分类
    static async createCategory(v) {
        // 查询是否存在重复的分类
        const hasCategory = await Category.findOne({
            where: {
                name: v.get('body.name'),
                deleted_at: null
            }
        });

        if (hasCategory) {
            throw new global.errs.Forbidden('分类已存在');
        }

        const category = new Category();
        category.name = v.get('body.name');
        category.key = v.get('body.key');
        category.parent_id = v.get('body.parent_id');

        category.save();
    }

    // 删除分类
    static async destroyCategory(id) {
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
    static async getCategory(id) {
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
    static async updateCategory(id, v) {
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
    static async getCategoryList() {
        return await Category.scope('bh').findAll({
            where: {
                deleted_at: null
            }
        })
    }
}

module.exports = {
    CategoryDao
}