const { Rule, ParamsValidator } = require('@core/params-validator')

class CategoryValidator extends ParamsValidator {
    constructor() {
        super()
        this.name = [new Rule('isLength', '分类 name 名字不能为空', { min: 1 })]
        this.category_key = [new Rule('isLength', '分类英文 key 不能为空', { min: 1 })]
    }
}

class PositiveIdParamsValidator extends ParamsValidator {
    constructor() {
        super()
        this.id = [new Rule('isInt', '分类ID需要正整数', { min: 1 })]
    }
}

module.exports = {
    CategoryValidator,
    PositiveIdParamsValidator
}
