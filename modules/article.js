const db = require('../config/db');
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
            tag: data.tag,
            introduction: data.introduction,
            content: data.content,
            category: data.category,
            recommend: data.recommend,
            browser: data.browser,
        })
    }

    /**
     * 更新文章数据
     * @param id  用户ID
     * @param data  事项的状态
     * @returns {Promise.<boolean>}
     */
    static async updateArticle(id, data) {
        await Article.update({
            title: data.title,
            author: data.author,
            tag: data.tag,
            introduction: data.introduction,
            content: data.content,
            category: data.category,
            recommend: data.recommend,
            browser: data.browser,
        }, {
            where: {
                id
            },
            fields: ['title', 'author', 'tag', 'introduction', 'content', 'category', 'recommend', 'browser']
        });
        return true
    }

    /**
     * 获取文章列表
     * @returns {Promise<*>}
     */
    static async getArticleList(params) {
        let ret = null;
        let page = params.page ? params.page : 1;
        let category = params.category ? params.category : '';
        let sort = params.sort ? params.sort : '';

        if (category) {
            ret = await Article.findAndCountAll({
                limit: 10,//每页10条
                offset: (page - 1) * 10,
                where: {
                    category: category
                },
            });

        } else {
            ret = await Article.findAndCountAll({
                limit: 10,//每页10条
                offset: (page - 1) * 10,
            });
        }

        return {
            code: 200,
            data: ret.rows,
            meta: {
                current_page: parseInt(page),
                per_page: 10,
                count: ret.count,
                total: ret.count,
                total_pages: Math.ceil(ret.count / 10),
            }
        }
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
