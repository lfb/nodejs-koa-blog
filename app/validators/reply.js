const { Rule, ParamsValidator } = require('@core/params-validator')

class ReplyValidator extends ParamsValidator {
    constructor() {
        super()

        this.content = [new Rule('isLength', 'content 不能为空', { min: 1 })]
        this.comment_id = [new Rule('isLength', 'comment_id 不能为空', { min: 1 })]
        // this.user_id = [
        //   new Rule("isLength", "user_id 不能为空", { min: 1 })
        // ]
        // this.reply_user_id = [
        //   new Rule("isLength", "reply_user_id 不能为空", { min: 1 })
        // ]
    }
}

class PositiveArticleIdParamsValidator extends ParamsValidator {
    constructor() {
        super()
        this.id = [new Rule('isInt', '评论ID需要正整数', { min: 1 })]
    }
}

module.exports = {
    ReplyValidator,
    PositiveArticleIdParamsValidator
}
