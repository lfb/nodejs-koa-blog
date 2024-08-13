const { Rule, ParamsValidator } = require('@core/params-validator')

class TokenNotEmptyValidator extends ParamsValidator {
    constructor() {
        super()
        this.token = [new Rule('isLength', '不允许为空', { min: 1 })]
    }
}

module.exports = {
    TokenNotEmptyValidator
}
