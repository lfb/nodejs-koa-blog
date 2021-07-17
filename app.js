const Koa = require('koa')
const InitManager = require('./core/init')
const parser = require('koa-bodyparser')
const cors = require('@koa/cors');
require('module-alias/register')


const catchError = require('./middlewares/exception')

const app = new Koa()

app.use(cors())
app.use(catchError)
app.use(parser())

InitManager.initCore(app)

app.listen(5000, () => {
  console.log('Koa is listening in http://localhost:5000')
})

module.exports = app
