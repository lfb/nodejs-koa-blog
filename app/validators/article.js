const {
    Rule,
    LinValidator
} = require('../../core/lin-validator-v2')

const {Category} = require('../models/category')

class ArticleValidator extends LinValidator {
    constructor() {
        super()
        this.title = [new Rule("isLength", "文章标题不能为空", {min: 1})]
        this.author = [new Rule("isLength", "文章作者不能为空", {min: 1})]
        this.content = [new Rule("isLength", "文章内容不能为空", {min: 1})]
        this.cover = [new Rule("isLength", "文章封面不能为空", {min: 1})]
        this.category_id = [new Rule("isLength", "文章分类不能为空", {min: 1})]
    }

    async validateCategoryId(vals) {
        const categoryId = vals.body.category_id
        const category = await Category.findOne({
            where: {
                id: categoryId
            }
        })
        if (!category) {
            throw new Error('暂无此分类ID')
        }
    }
}

class PositiveIdParamsValidator extends LinValidator {
    constructor() {
        super();
        this.id = [
            new Rule('isInt', '文章ID需要正整数', {min: 1})
        ]
    }
}

module.exports = {
    ArticleValidator,
    PositiveIdParamsValidator
}
