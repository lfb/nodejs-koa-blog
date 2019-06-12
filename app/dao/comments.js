const {Comments} = require('../models/comments')
const {Article} = require('../models/article')

class CommentsDao {
    // 创建评论
    static async createComments(v) {

        // 查询文章
        const article = await Article.findByPk(v.get('body.article_id'));
        if (!article) {
            throw new global.errs.NotFound('没有找到相关文章');
        }

        const comments = new Comments();

        comments.nickname = v.get('body.nickname');
        comments.email = v.get('body.email');
        comments.content = v.get('body.content');
        comments.article_id = v.get('body.article_id');
        comments.parent_id = v.get('body.parent_id');

        return comments.save();
    }

    // 删除评论
    static async destroyComments(id) {
        const comments = await Comments.findOne({
            where: {
                id,
                deleted_at: null
            }
        });
        if (!comments) {
            throw new global.errs.NotFound('没有找到相关评论');

        }
        comments.destroy()
    }

    // 获取评论详情
    static async getComments(id) {
        const comments = await Comments.scope('iv').findOne({
            where: {
                id,
                deleted_at: null
            }
        });
        if (!comments) {
            throw new global.errs.NotFound('没有找到相关评论信息');
        }

        return comments
    }

    // 更新评论
    static async updateComments(id, v) {
        const comments = await Comments.findByPk(id);
        if (!comments) {
            throw new global.errs.NotFound('没有找到相关评论信息');
        }
        comments.nickname = v.get('body.nickname');
        comments.email = v.get('body.email');
        comments.content = v.get('body.content');
        comments.article_id = v.get('body.article_id');
        comments.parent_id = v.get('body.parent_id');

        comments.save();
    }


    // 评论列表
    static async getCommentsList() {
        return await Comments.scope('bh').findAll({
            where: {
                deleted_at: null
            }
        })
    }

    // 文章下的评论
    static async getArticleComments(articleId) {
        return await Comments.scope('iv').findAll({
            where: {
                article_id: articleId,
                deleted_at: null
            }
        })
    }
}

module.exports = {
    CommentsDao
}