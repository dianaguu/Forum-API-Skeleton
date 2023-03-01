const path = require('path')
global.requireWrapper = name => {
  return require(path.resolve(__dirname, name))
}

const express = require('express')
const handlebars = require('express-handlebars')
const { apis, pages } = require('./routes')

const app = express()
const port = process.env.PORT || 3000

// ===========================================================
// views: express-handlebars
app.engine('hbs', handlebars({ extname: '.hbs' }))
app.set('view engine', 'hbs')
// ===========================================================

app.use('/api', apis)
app.use(pages)
app.listen(port, () => {
  console.info(`Forum app listening on port ${port}!`)
})
