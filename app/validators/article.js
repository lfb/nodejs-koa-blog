const {
    Rule,
    LinValidator
} = require('../../core/lin-validator-v2')

class ArticleValidator extends LinValidator {
    constructor() {
        super()
        this.title = [new Rule("isLength", "文章标题不能为空", {
            min: 1
        })]
        this.author = [new Rule("isLength", "文章作者不能为空", {
            min: 1
        })]
        this.content = [new Rule("isLength", "文章内容不能为空", {
            min: 1
        })]
        this.cover = [new Rule("isLength", "文章封面不能为空", {
            min: 1
        })]
    }
}

module.exports = {
    ArticleValidator
}
