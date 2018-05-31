const db = require('../config/db')
const Sequelize = db.sequelize;
const Article = Sequelize.import('../schema/article');
Article.sync({force: false});

class ArticleModel {
    /**
     * 创建文章
     * @param data
     * @returns {Promise<*>}
     */
    static async createArticle(data) {
        let title = data.title,
            author = data.author,
            content = data.content,
            cover = data.cover,
            star = data.star,
            is_top = data.is_top,
            browse = data.browse,
            category = data.category;

        return await Article.create({
            title,
            author,
            content,
            cover,
            star,
            is_top,
            browse,
            category,
        })
    }

    /**
     * 获取文章列表
     * @returns {Promise<*>}
     */
    static async getArticlelist() {
        return await Article.findAndCountAll()
    }

    /**
     * 获取文章详情数据
     * @param id  文章ID
     * @returns {Promise<Model>}
     */
    static async getArticleDetail(id) {
        return await Article.findOne({
            where: {
                id,
            },
        })
    }


    /**
     * 删除文章
     * @param id listID
     * @returns {Promise.<boolean>}
     */
    static async deleteArticle(id) {
        await Article.destroy({
            where: {
                id,
            }
        })
        return true
    }

    /**
     * 更新文章数据
     * @param id  用户ID
     * @param status  事项的状态
     * @returns {Promise.<boolean>}
     */
    static async updateArticle(id, ret) {
        let title = ret.title,
            author = ret.author,
            content = ret.content,
            cover = ret.cover,
            star = ret.star,
            is_top = ret.is_top,
            browse = ret.browse,
            category = ret.category;

        await Article.update({
            title,
            author,
            content,
            cover,
            star,
            is_top,
            browse,
            category,
        }, {
            where: {
                id
            },
            fields: ['title', 'author', 'star', 'cover', 'is_top', 'content', 'browse', 'category']
        })
        return true
    }
}

module.exports = ArticleModel
