const Router = require('koa-router')

const router = new Router()

// 404
router.get('*', async (ctx, next) => {
  await ctx.render('404')
})

module.exports = router
