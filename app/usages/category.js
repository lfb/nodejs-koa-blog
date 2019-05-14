const {Article} = require('../models/article')
const {Category} = require('../models/category')

class CategoryModelUsage {
    // 创建分类
    async create(cxt) {
        return await Category.create(cxt)
    }

    // 获取文章列表
    async list() {
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

    // 获取文章详情
    async article(key) {
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
    CategoryModelUsage
}
