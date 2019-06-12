const {Sequelize} = require('sequelize')

const {Article} = require('../models/article')


// 定义文章模型
class ArticleDao {

    // 创建文章
    static async createArticle(v) {

        // 检测是否存在文章
        const hasArticle = await Article.findOne({
            where: {
                title: v.get('body.title'),
                deleted_at: null
            }
        });

        // 如果存在，抛出存在信息
        if (hasArticle) {
            throw new global.errs.Forbidden('文章已存在');
        }

        // 创建文章
        const article = new Article();

        article.title = v.get('body.title');
        article.author = v.get('body.author');
        article.content = v.get('body.content');
        article.cover = v.get('body.cover');
        article.browse = v.get('body.browse');
        article.category_id = v.get('body.category_id');

        article.save();
    }

    // 获取文章列表
    static async getArticleList() {
        return await Article.scope('iv').findAll({
            where: {
                deleted_at: null
            }
        })
    }

    // 删除文章
    static async destroyArticle(id) {
        // 检测是否存在文章
        const article = await Article.findOne({
            where: {
                id,
                deleted_at: null
            }
        });
        // 不存在抛出错误
        if (!article) {
            throw new global.errs.NotFound('没有找到相关文章');

        }

        // 软删除文章
        article.destroy()
    }

    // 更新文章
    static async updateArticle(id, v) {
        // 查询文章
        const article = await Article.findByPk(id);
        if (!article) {
            throw new global.errs.NotFound('没有找到相关文章');
        }

        // 更新文章
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
        // 查询文章
        const article = await Article.findByPk(id);
        if (!article) {
            throw new global.errs.NotFound('没有找到相关文章');
        }
        // 更新文章浏览
        article.browse = browse;

        article.save();
    }

    // 文章详情
    static async getArticleDetail(id) {
        const article = await Article.scope('iv').findOne({
            where: {
                id
            }
        });

        if (!article) {
            throw new global.errs.NotFound('没有找到相关文章');
        }

        return article;
    }

    // 搜索文章
    static async getArticleByKeyword(keyword) {
        return await Article.findAll({
            where: {
                title: {
                    [Sequelize.Op.like]: `%${keyword}%`
                },
                deleted_at: null
            }
        });
    }

}

module.exports = {
    ArticleDao
}
