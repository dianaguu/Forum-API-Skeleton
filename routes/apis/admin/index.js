const router = require('express').Router()

/* eslint-disable */
const { requestAuthenticated, requestAuthenticatedAdmin } = requireWrapper('middlewares/apiAuthentication')
/* eslint-enable */

// objective
router.use('/objectives', requestAuthenticated, requestAuthenticatedAdmin, require('./objective.route'))

// URL: /api/admin root
router.use('/', (req, res) =>
  res.json({
    status: 'success',
    data: {
      Name: process.env.npm_package_name,
      Version: process.env.npm_package_version,
      URL: '/api/admin',
      Permission: 'Administrator',
      Description: 'Apply this forum to the objective you like. Enjoy!'
    }
  })
)

module.exports = router
