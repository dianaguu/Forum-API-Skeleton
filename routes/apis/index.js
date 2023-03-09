const router = require('express').Router()

/* eslint-disable */
const accountController = requireWrapper('controllers/apis/account.controller')
const { accountAuthenticated } = requireWrapper('middlewares/apiAuthentication')
const { apiErrorHandler } = requireWrapper('middlewares/errorHandler')
/* eslint-enable */

// objective
router.use('/objectives', accountAuthenticated, require('./objective.route'))

// account
router.post('/signup', accountController.signUp)
router.post('/signin', accountAuthenticated, accountController.signIn)

// api root
router.use('/', (req, res) =>
  res.json({
    status: 'success',
    data: {
      Name: process.env.npm_package_name,
      Version: process.env.npm_package_version,
      Description: 'Apply this forum to the objective you like. Enjoy!'
    }
  })
)

// error handler
router.use(apiErrorHandler)

module.exports = router
