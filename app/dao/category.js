const {Category} = require('../models/category')
const {Article} = require('../models/article')

class CategoryDao {
    // 创建分类
    static async createCategory(v) {
        const hasCategory = await Category.findOne({
            where: {
                name: v.get('body.name'),
                delete_at: null
            }
        });

        if (hasCategory) {
            throw new global.errs.Forbidden('分类已存在');
        }

        const cate = new Category();
        console.log(v.get('body.name'))
        cate.name = v.get('body.name');
        cate.key = v.get('body.key');
        cate.parent_id = v.get('body.parent_id');

        cate.save();
    }

    // 删除分类
    static async destroyCategory(id) {
        const category = await Category.findOne({
            where: {
                id,
                delete_at: null
            }
        });
        if (!category) {
            throw new global.errs.NotFound('没有找到相关分类');

        }
        category.destroy()
    }

    // 获取分类详情
    static async getCategory(id) {
        const category = await Category.findOne({
            where: {
                id,
                delete_at: null
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
        return await Category.findAll({
            where: {
                delete_at: null
            },
            include: [{
                model: Article,
                // 过滤文章的字段，只返回文章的id和标题即可
                attributes: {
                    exclude: [
                        'author',
                        'content',
                        'cover',
                        'browse',
                        'create_at',
                        'update_at',
                        'delete_at',
                        'category_id',
                        'CategoryId'
                    ]
                }
            }]
        })
    }

    // 关联分类的文章
    static async getArticle(id) {
        return await Article.findAll({
            where: {
                category_id: id,
                delete_at: null
            },
            include: [{
                model: Category
            }]
        })
    }
}

module.exports = {
    CategoryDao
}