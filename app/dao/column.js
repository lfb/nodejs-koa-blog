const {Sequelize, Op} = require('sequelize')


const {Column} = require('../models/column')
const {Category} = require('../models/category')
const {Comments} = require('../models/comments')

// 定义专栏模型
class ColumnDao {

    // 创建专栏
    static async createColumn(v) {

        // 检测是否存在专栏
        const hasColumn = await Column.findOne({
            where: {
                title: v.get('body.title'),
                deleted_at: null
            }
        });

        // 如果存在，抛出存在信息
        if (hasColumn) {
            throw new global.errs.Existing('专栏已存在');
        }

        // 创建专栏
        const column = new Column();

        column.title = v.get('body.title');
        column.author = v.get('body.author');
        column.description = v.get('body.description');
        column.content = v.get('body.content');
        column.cover = v.get('body.cover');
        column.browse = v.get('body.browse');
        column.category_id = v.get('body.category_id');
        column.chapter_id = v.get('body.chapter_id');

        column.save();
    }

    // 获取专栏列表
    static async getCColumnList(page = 1, desc = 'created_at', category_id, keyword) {
        const pageSize = 10;

        // 筛选方式
        let filter = {
            deleted_at: null
        };

        // 筛选方式：存在分类ID
        if (category_id) {
            filter.category_id = category_id;
        }

        // 筛选方式：存在搜索关键字
        if (keyword) {
            filter.title = {
                [Op.like]: `%${keyword}%`
            };
        }
        const column = await Column.scope('iv').findAndCountAll({
            limit: pageSize,//每页10条
            offset: (page - 1) * pageSize,
            where: filter,
            order: [
                [desc, 'DESC']
            ]
        });

        const categoryIds = [];
        const columnIds = [];

        const r = column.rows;
        r.forEach(column => {
            columnIds.push(column.id);
            categoryIds.push(column.category_id);
        });


        // // 获取每篇专栏评论
        const comments = await ColumnDao._getColumnComments(columnIds);
        r.forEach(column => {
            ColumnDao._setColumnComments(column, comments)
        });

        // 获取每篇专栏分类详情
        const category = await ColumnDao._getColumnCategoryDetail(categoryIds);
        r.forEach(column => {
            ColumnDao._setColumnCategoryDetail(column, category)
        });

        return {
            data: r,
            // 分页
            meta: {
                current_page: parseInt(page),
                per_page: 10,
                count: column.count,
                total: column.count,
                total_pages: Math.ceil(column.count / 10),
            }
        };
    }

    // 获取每篇专栏评论
    static async _getColumnComments(columnIds) {
        return await Comments.scope('bh').findAll({
            where: {
                column_id: {
                    [Op.in]: columnIds
                }
            },
            group: ['column_id'],
            attributes: ['column_id', [Sequelize.fn('COUNT', '*'), 'count']]
        })
    }

    // 设置每章专栏评论总数
    static _setColumnComments(column, comments) {
        let count = 0;
        comments.forEach(item => {
            if (parseInt(column.id) === parseInt(item.column_id)) {
                count = item.get('count')
            }
        })
        column.setDataValue('comments_nums', count);

        return column
    }

    // 获取每篇专栏分类详情
    static async _getColumnCategoryDetail(categoryIds) {
        return await Category.scope('bh').findAll({
            where: {
                id: {
                    [Op.in]: categoryIds
                }
            }
        })
    }

    // 设置每章专栏分类详情
    static _setColumnCategoryDetail(column, category) {
        category.forEach(item => {
            if (parseInt(column.category_id) === parseInt(item.id)) {
                column.setDataValue('category_detail', item);
            }
        })

        return column
    }


    // 删除专栏
    static async destroyColumn(id) {
        // 检测是否存在专栏
        const column = await Column.findOne({
            where: {
                id,
                deleted_at: null
            }
        });
        // 不存在抛出错误
        if (!column) {
            throw new global.errs.NotFound('没有找到相关专栏');

        }

        // 软删除专栏
        column.destroy()
    }

    // 更新专栏
    static async updateColumn(id, v) {
        // 查询专栏
        const column = await Column.findByPk(id);
        if (!column) {
            throw new global.errs.NotFound('没有找到相关文章');
        }

        // 更新文章
        column.title = v.get('body.title');
        column.author = v.get('body.author');
        column.description = v.get('body.description');
        column.content = v.get('body.content');
        column.cover = v.get('body.cover');
        column.browse = v.get('body.browse');
        column.category_id = v.get('body.category_id');
        column.chapter_id = v.get('body.chapter_id');

        column.save();
    }

    // 更新文章浏览次数
    static async updateColumnBrowse(id, browse) {
        // 查询文章
        const column = await Column.findByPk(id);
        if (!column) {
            throw new global.errs.NotFound('没有找到相关文章');
        }
        // 更新文章浏览
        column.browse = browse;

        column.save();
    }

    // 文章详情
    static async getColumnDetail(id) {
        const column = await Column.findOne({
            where: {
                id
            }
        });

        if (!column) {
            throw new global.errs.NotFound('没有找到相关文章');
        }

        return column;
    }

    // 搜索文章
    static async getColumnByKeyword(keyword, page = 1, desc = 'created_at') {
        const pageSize = 10;

        const column = await Column.findAndCountAll({
            where: {
                title: {
                    [Op.like]: `%${keyword}%`
                },
                deleted_at: null
            },
            limit: pageSize,//每页10条
            offset: (page - 1) * pageSize,
            order: [
                [desc, 'DESC']
            ]
        });

        const categoryIds = [];
        const columnIds = [];

        const r = column.rows;
        r.forEach(column => {
            columnIds.push(column.id);
            categoryIds.push(column.category_id);
        });

        // 获取每篇专栏评论
        const comments = await ColumnDao._getColumnComments(columnIds);
        r.forEach(column => {
            ColumnDao._setColumnComments(column, comments)
        });

        // 获取每篇专栏分类详情
        const category = await ColumnDao._getColumnCategoryDetail(categoryIds);
        r.forEach(column => {
            ColumnDao._setColumnCategoryDetail(column, category)
        });

        return {
            data: r,
            // 分页
            meta: {
                current_page: parseInt(page),
                per_page: 10,
                count: column.count,
                total: column.count,
                total_pages: Math.ceil(column.count / 10),
            }
        };
    }

}

module.exports = {
    ColumnDao
}
