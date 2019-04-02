const db = require('../config/db');
const Sequelize = db.sequelize;
const Op = Sequelize.Op;
const Article = Sequelize.import('../schema/article');
const Category = Sequelize.import('../schema/category');

Category.hasMany(Article); // 将会添加 category_id 到 ArticleModel 模型
Article.belongsTo(Category, {foreignKey: 'categoryId'});

Article.sync({force: false});

class ArticleModel {
    /**
     * 创建文章
     * @param data 创建文章的参数
     * @returns {Promise<void>}
     */
    static async create(data) {
        return await Article.create(data)
    }

    /**
     * 更新文章数据
     * @param id 文章ID
     * @param data 文章更新的属性参数
     */
    static async update(id, data) {
        return await Article.update(data, {
            where: {
                id
            },
            fields: ['title', 'browser', 'author', 'introduction', 'categoryId', 'is_del', 'tag', 'cover', 'content']
        });
    }

    /**
     * 搜索文章
     * @param params keyword 关键字
     *
     * @returns  返回匹配文章标题的文章列表数据
     */
    static async search(params) {
        let {page = 1, keyword} = params;

        let ret = await Article.findAndCountAll({
            limit: 10,//每页10条
            offset: (page - 1) * 10,
            where: {
                title: {
                    // 模糊查询
                    [Op.like]: '%' + keyword + '%'
                },
                is_del: 0
            },
            include: {
                model: Category,
                where: {
                    categoryId: Sequelize.col('article.categoryId')
                }
            },
            'order': [
                ['id', 'DESC']
            ],
            attributes: {exclude: ['content']}
        });


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
     * 获取文章列表
     * @returns {Promise<*>}
     */
    static async list(params) {
        let ret = null;
        let {page = 1, category_id, title, include} = params;


        let exclude = include === 'is_del' ? ['content'] : ['content', 'is_del']
        let isShowIsDel = include === 'is_del' ? 1 : 0

        if (category_id) {
            ret = await Article.findAndCountAll({
                limit: 10,//每页10条
                offset: (page - 1) * 10,
                where: {
                    category_id: category_id,
                    is_del: isShowIsDel ? [0, 1] : [0]
                },
                include: [{
                    model: Category,
                    where: {categoryId: Sequelize.col('article.categoryId')}
                }],
                'order': [
                    ['id', 'DESC']
                ],
                attributes: {exclude: exclude}
            });

        } else if (title) {
            ret = await Article.findAndCountAll({
                limit: 10,//每页10条
                offset: (page - 1) * 10,
                where: {
                    title,
                    is_del: isShowIsDel ? [0, 1] : [0]
                },
                include: [{
                    model: Category,
                    where: {categoryId: Sequelize.col('article.categoryId')}
                }],
                'order': [
                    ['id', 'DESC']
                ],
                attributes: {exclude: exclude}
            });

        } else {
            ret = await Article.findAndCountAll({
                limit: 10,//每页10条
                offset: (page - 1) * 10,
                'order': [
                    ['id', 'DESC']
                ],
                where: {
                    is_del: isShowIsDel ? [0, 1] : [0]
                },
                include: [{
                    model: Category,
                    where: {categoryId: Sequelize.col('article.categoryId')}
                }],
                attributes: {exclude: exclude}

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
    static async detail(id) {
        return await Article.findOne({
            where: {
                id,
                is_del: 0
            },
            include: [{
                model: Category,
                where: {categoryId: Sequelize.col('article.categoryId')}
            }],
            attributes: {exclude: ['is_del']}
        })
    }

    /**
     * 软删除文章（隐藏文章）
     * @param id 文章ID
     * @param data 文章ID
     */
    static async hidden(id, data) {
        return await Article.update(data, {
            where: {
                id,
            },
            fields: ['is_del']
        })
    }
}

module.exports = ArticleModel
