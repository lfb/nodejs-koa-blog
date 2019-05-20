const {
    Rule,
    LinValidator
} = require('../../core/lin-validator-v2')


class TokenNotEmptyValidator extends LinValidator {
    constructor() {
        super()
        this.token = [
            new Rule('isLength', '不允许为空', {min: 1})
        ]
    }
}

module.exports = {
    TokenNotEmptyValidator
}
