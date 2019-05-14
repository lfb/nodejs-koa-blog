const {
    Rule,
    LinValidator
} = require('../../core/lin-validator-v2')

class CategoryValidator extends LinValidator {
    constructor() {
        super()
        this.name = [new Rule("isLength", "分类名字不能为空", {min: 1})]
        this.key = [new Rule("isLength", "分类关键字不能为空", {min: 1})]
    }
}

class PositiveKeyParamsValidator extends LinValidator {
    constructor() {
        super();
        this.key = [
            new Rule('isLength', '分类关键字不能为空', {min: 1})
        ]
    }
}

module.exports = {
    CategoryValidator,
    PositiveKeyParamsValidator
}
