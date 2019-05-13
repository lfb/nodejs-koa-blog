const {
    Rule,
    LinValidator
} = require('../../core/lin-validator-v2')

const {LoginType} = require('../lib/enum')

class TokenValidator extends LinValidator {
    constructor() {
        super()
        this.account = [
            new Rule('isLength', '不符合账号规则', {
                min: 4,
                max: 32
            })
        ]
        this.secret = [
            new Rule('isOptional'),
            new Rule('isLength', '最少6个字符', {
                min: 6,
                max: 128
            })
        ]
    }

    validateLoginType(vals) {
        if (!vals.body.type) {
            throw new Error('type是必须参数')
        }

        if (!LoginType.isThisType(vals.body.type)) {
            throw new Error('type参数不合法')
        }

    }
}


module.exports = {
    TokenValidator
}
