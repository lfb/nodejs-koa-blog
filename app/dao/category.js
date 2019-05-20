const {Category} = require('../models/category')
const {Article} = require('../models/article')

class CategoryDao {
    // 创建分类
    static async createCategory(params) {
        return await Category.create(params)
    }

// 分类列表
    static async getCategoryList() {
        return await Category.findAndCountAll({
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
    static async getArticle(key) {
        return await Category.findAll({
            where: {
                key
            },
            include: [{
                model: Article,
                include: [{
                    model: Category
                }],
                // 过滤文章内容
                attributes: {
                    exclude: [
                        'content'
                    ]
                }
            }]
        })
    }
}

module.exports = {
    CategoryDao
}