const Router = require('koa-router')
const router = new Router()

const {ParameterException} = require('../../../core/http-exception')
const {PositiveIntegerValidator} = require('../../validators/classic')

router.post('/v1/:id/classic/latest', async (ctx, next) => {

    const v = await new PositiveIntegerValidator().validate(ctx)
    const id = v.get('path.id', parsed = false)

    ctx.body = {
        id
    }

})

module.exports = router
