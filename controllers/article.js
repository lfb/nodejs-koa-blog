const ArticleModel = require('../modules/article')
const db = require('../config/db');
const Sequelize = db.sequelize;
const Category = Sequelize.import('../schema/category');

const statusCode = require('../util/status-code')

class articleController {
    /**
     * 创建文章
     * @param ctx
     * @returns {Promise.<void>}
     */
    static async create(ctx) {
        let req = ctx.request.body;

        if (req.title
            && req.author
            && req.introduce
            && req.category
            && req.banner
            && req.content
        ) {
            try {
                // 查询分类是否存在
                let categoryDetail = await Category.findOne({
                    where: {
                        name: req.category,
                    },
                });
                if (categoryDetail) {
                    req.categoryId = categoryDetail.id;

                } else {
                    ctx.response.status = 412;
                    ctx.body = statusCode.ERROR_412({
                        msg: '缺少此文章分类，请重新创建分类: ' + req.category
                    })
                    return false;
                }

                const ret = await ArticleModel.createArticle(req);
                const data = await ArticleModel.getArticleDetail(ret.id);

                ctx.response.status = 200;
                ctx.body = statusCode.SUCCESS_200('创建文章成功', data);

            } catch (err) {
                ctx.response.status = 412;
                ctx.body = statusCode.ERROR_412({
                    msg: '创建失败',
                    err,
                })
            }
        } else {
            ctx.response.status = 412;
            ctx.body = statusCode.ERROR_412({
                msg: '请检查参数2！'
            })
        }
    }

    static async search(ctx) {
        try {
            let data = await ArticleModel.search(ctx.query);
            ctx.response.status = 200;
            ctx.body = statusCode.SUCCESS_200('查询文章成功！', data)
        } catch (e) {
            console.log(e);
            ctx.response.status = 412;
            ctx.body = statusCode.ERROR_412(e);
        }
    }

    /**
     * 获取文章列表
     * @param ctx
     * @returns {Promise.<void>}
     */
    static async list(ctx) {
        let params = ctx.query;
        try {
            const data = await ArticleModel.getArticleList(params);
            ctx.response.status = 200;
            ctx.body = statusCode.SUCCESS_200('查询文章列表成功！', data)
        } catch (e) {

            ctx.response.status = 412;
            ctx.body = statusCode.ERROR_412(e);
        }
    }

    /**
     * 查询单条文章数据
     * @param ctx
     * @returns {Promise.<void>}
     */
    static async detail(ctx) {
        let id = ctx.params.id;

        if (id) {
            try {
                let data = await ArticleModel.getArticleDetail(id);
                ctx.response.status = 200;
                ctx.body = statusCode.SUCCESS_200('查询成功！', {
                    data
                });

            } catch (err) {
                ctx.response.status = 412;
                ctx.body = statusCode.ERROR_412({
                    mgs: '查询失败',
                    err,
                })
            }
        } else {
            ctx.response.status = 412;
            ctx.body = statusCode.ERROR_412('文章ID必须传');
        }
    }


    /**
     * 删除文章数据
     * @param ctx
     * @returns {Promise.<void>}
     */
    static async delete(ctx) {
        let id = ctx.params.id;

        if (id && !isNaN(id)) {
            try {
                await ArticleModel.deleteArticle(id);
                ctx.response.status = 200;
                ctx.body = statusCode.SUCCESS_200('删除文章成功！');

            } catch (err) {
                ctx.response.status = 200;
                ctx.body = statusCode.SUCCESS_200({
                    msg: '删除失败',
                    err,
                });

            }
        } else {
            ctx.response.status = 412;
            ctx.body = statusCode.ERROR_412('文章ID必须传！');
        }
    }

    /**
     * 更新导航条数据
     * @param ctx
     * @returns {Promise.<void>}
     */
    static async update(ctx) {
        let req = ctx.request.body;
        let id = ctx.params.id;

        if (req) {
            await ArticleModel.updateArticle(id, req);
            let data = await ArticleModel.getArticleDetail(id);

            ctx.response.status = 200;
            ctx.body = statusCode.SUCCESS_200('更新文章成功！', data);
        } else {

            ctx.response.status = 412;
            ctx.body = statusCode.ERROR_412('更新文章失败！')
        }
    }
}

module.exports = articleController
