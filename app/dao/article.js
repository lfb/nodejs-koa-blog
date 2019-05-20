const {Article} = require('../models/article')
const {Category} = require('../models/category')

// 定义文章模型
class ArticleDao {
    // 创建文章
    static async createArticle(params) {
        return await Article.create(params)
    }

    // 文章列表
    static async getArticleList() {
        return await Article.findAll({
            // 过滤文章内容
            attributes: {
                exclude: [
                    'content',
                    'CategoryId'
                ]
            }
        })
    }

    // 文章详情
    static async getArticleDetail(id) {
        return await Article.findOne({
            where: {
                id
            },
            // 把文章关联的分类也查询出来
            include: [{
                model: Category
            }]
        })
    }

}

module.exports = {
    ArticleDao
}
