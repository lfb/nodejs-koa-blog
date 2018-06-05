const ArticleModel = require('../modules/article')

class articleController {
    /**
     * 创建文章列表
     * @param ctx
     * @returns {Promise.<void>}
     */
    static async createArticle(ctx) {
        let articleData = ctx.request.body;

        if (articleData) {
            let ret = await ArticleModel.createArticle(articleData);
            let data = await ArticleModel.getArticleDetail(ret.id);

            ctx.body = {
                code: 200,
                data: data,
                message: '创建成功'
            }
        } else {
            ctx.body = {
                code: -1,
                message: '创建失败'
            }
        }
    }

    /**
     * 获取文章列表
     * @param ctx
     * @returns {Promise.<void>}
     */
    static async getArticleList(ctx) {
        let articleList = ctx.request.body
        if (articleList) {
            const data = await ArticleModel.getArticlelist()
            ctx.body = {
                code: 200,
                data: {
                    data
                },
                message: '查询成功'
            }
        } else {
            ctx.body = {
                code: -1,
                message: '获取失败'
            }
        }

    }

    /**
     * 查询单条文章数据
     * @param ctx
     * @returns {Promise.<void>}
     */
    static async getArticleDetail(ctx) {
        let id = ctx.params.id;

        if (id) {
            let data = await ArticleModel.getArticleDetail(id);

            ctx.body = {
                code: 200,
                data,
                message: '查询成功'
            }
        } else {
            ctx.body = {
                code: -1,
                message: 'ID必须传'
            }
        }
    }


    /**
     * 删除文章数据
     * @param ctx
     * @returns {Promise.<void>}
     */
    static async deleteArticle(ctx) {
        let id = ctx.params.id;
        if (id && !isNaN(id)) {
            await ArticleModel.deleteArticle(id);
            ctx.body = {
                code: 200,
                message: '删除成功'
            }
        } else {
            ctx.body = {
                code: -1,
                message: '删除失败'
            }
        }
    }

    /**
     * 更新导航条数据
     * @param ctx
     * @returns {Promise.<void>}
     */
    static async updateArticle(ctx) {
        let articleData = ctx.request.body

        if (articleData) {

            await ArticleModel.updateArticle(articleData.id, articleData);
            let data = await ArticleModel.getArticleDetail(articleData.id);

            ctx.body = {
                code: 200,
                data: data,
                message: '更新成功'
            }

        } else {
            ctx.body = {
                code: -1,
                message: '更新失败'
            }
        }
    }
}

module.exports = articleController
