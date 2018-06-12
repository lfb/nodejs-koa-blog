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
        return await Article.create({
            title: data.title,
            author: data.author,
            content: data.content,
            category: data.category
        })
    }

    /**
     * 更新文章数据
     * @param id  用户ID
     * @param status  事项的状态
     * @returns {Promise.<boolean>}
     */
    static async updateArticle(id, data) {
        await Article.update({
            title: data.title,
            author: data.author,
            content: data.content,
            category: data.category
        }, {
            where: {
                id
            },
            fields: ['title', 'author', 'content', 'category']
        })
        return true
    }

    /**
     * 获取文章列表
     * @returns {Promise<*>}
     */
    static async getArticleList() {
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

}

module.exports = ArticleModel
