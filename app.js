const Koa = require('koa')
const InitManager = require('./core/init')
const parser = require('koa-bodyparser')
const cors = require('@koa/cors');
const views = require('koa-views');
const {resolve} = require('path')
const koaStatic = require('koa-static')

const catchError = require('./middlewares/exception')

const app = new Koa()

app.use(koaStatic(__dirname + '/public'))
app.use(views(resolve(__dirname, './views'), {
  extension: 'ejs'
}))
app.use(cors())
app.use(catchError)
app.use(parser())

InitManager.initCore(app)

app.listen(3000, () => {
  console.log('Koa is listening in http://localhost:3000')
})

module.exports = app
