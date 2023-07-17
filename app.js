const path = require('path')
global.requireWrapper = name => {
  return require(path.resolve(__dirname, name))
}

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const express = require('express')
const handlebars = require('express-handlebars')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const MemoryStore = require('memorystore')(session)
const passport = require('./configs/passport')
const flash = require('connect-flash')
const methodOverride = require('method-override')
const handlebarHelper = require('./helpers/handlebar.helper')
const { getUser } = require('./helpers/authentication.helper')
const { apis, pages } = require('./routes')

const app = express()
const port = process.env.PORT
const SESSION_SECRET = process.env.SESSION_SECRET

// ===========================================================
// views: express-handlebars
app.engine('hbs', handlebars({ extname: '.hbs', helpers: handlebarHelper }))
app.set('view engine', 'hbs')
// ===========================================================
// parse HTTP request body with specific payload
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
// method-override
app.use(methodOverride('_method'))
// parse cookie
app.use(cookieParser())
// ===========================================================
// session and passport
app.use(session({
  cookie: { maxAge: 86400000 },
  store: new MemoryStore({
    checkPeriod: 86400000
  }),
  secret: SESSION_SECRET,
  resave: false,
  saveUninitialized: true
}))
app.use(passport.initialize())
app.use(passport.session())
// ===========================================================
// flash messages
app.use(flash())
// ===========================================================
// express static file
app.use('/upload', express.static('upload'))
// ===========================================================
// response local variables
app.use((req, res, next) => {
  res.locals.success_messages = req.flash('success_messages')
  res.locals.error_messages = req.flash('error_messages')
  res.locals.signInUser = getUser(req)
  next()
})
// ===========================================================

app.use('/api', apis)
app.use('/forum', pages)
app.use('/', (req, res) => res.status(404).json({ status: 'error', message: 'Not found' }))

app.listen(port, () => {
  console.info(`Forum app listening on port ${port}!`)
})
