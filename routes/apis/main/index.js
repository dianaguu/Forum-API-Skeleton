const router = require('express').Router()

/* eslint-disable */
const accountController = requireWrapper('controllers/apis/main/account.controller')
const { accountAuthenticated, requestAuthenticated, requestAuthenticatedAdmin } = requireWrapper('middlewares/apiAuthentication')
/* eslint-enable */

// objective
router.use('/objectives', requestAuthenticated, requestAuthenticatedAdmin, require('./objective.route'))

// account
router.post('/signup', accountController.signUp)
router.post('/signin', accountAuthenticated, accountController.signIn)

// URL: /api root
router.use('/', (req, res) =>
  res.json({
    status: 'success',
    data: {
      Name: process.env.npm_package_name,
      Version: process.env.npm_package_version,
      URL: '/api',
      Permission: 'User',
      Description: 'Apply this forum to the objective you like. Enjoy!'
    }
  })
)

module.exports = router
