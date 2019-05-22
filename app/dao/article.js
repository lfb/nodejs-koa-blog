const {Sequelize} = require('sequelize')

const {Article} = require('../models/article')
const {Category} = require('../models/category')

// 定义文章模型
class ArticleDao {
    // 创建文章
    static async createArticle(v) {
        const hasArticle = await Article.findOne({
            where: {
                title: v.get('body.title'),
                delete_at: null
            }
        });

        if (hasArticle) {
            throw new global.errs.Forbidden('文章已存在');
        }

        const art = new Article();
        art.title = v.get('body.title');
        art.author = v.get('body.author');
        art.content = v.get('body.content');
        art.cover = v.get('body.cover');
        art.browse = v.get('body.browse');
        art.category_id = v.get('body.category_id');

        art.save();
    }

    // 文章列表
    static async getArticleList() {
        const articleList = await Article.findAll({
            where: {
                delete_at: null
            },
            // 把文章关联的分类也查询出来
            include: [{
                model: Category
            }],
            // 过滤文章内容
            attributes: {
                exclude: [
                    'content',
                    'CategoryId'
                ]
            }
        })

        return articleList;
    }

    // 删除文章
    static async destroyArticle(id) {
        const article = await Article.findOne({
            where: {
                id,
                delete_at: null
            }
        });
        if (!article) {
            throw new global.errs.NotFound('没有找到相关文章');

        }
        article.destroy()
    }

    // 更新文章
    static async updateArticle(id, v) {
        const article = await Article.findByPk(id);
        if (!article) {
            throw new global.errs.NotFound('没有找到相关文章');
        }
        article.title = v.get('body.title');
        article.author = v.get('body.author');
        article.content = v.get('body.content');
        article.cover = v.get('body.cover');
        article.browse = v.get('body.browse');
        article.category_id = v.get('body.category_id');

        article.save();
    }

    // 更新文章浏览次数
    static async updateArticleBrowse(id, browse) {
        const article = await Article.findByPk(id);
        if (!article) {
            throw new global.errs.NotFound('没有找到相关文章');
        }
        article.browse = browse;

        article.save();
    }

    // 文章详情
    static async getArticleDetail(id) {
        const article = await Article.findOne({
            where: {
                id
            },
            // 把文章关联的分类也查询出来
            include: [{
                model: Category
            }]
        })

        if (!article) {
            throw new global.errs.NotFound('没有找到相关文章');
        }

        return article

    }

    // 搜索文章
    static async getArticleByKeyword(keyword) {
        return await Article.findAll({
            where: {
                title: {
                    [Sequelize.Op.like]: `%${keyword}%`
                },
                delete_at: null
            }
        });
    }

}

module.exports = {
    ArticleDao
}
