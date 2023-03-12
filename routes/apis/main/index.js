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

router.use('/', (req, res) =>
  res.status(400).json({ status: 'error', message: `${req.originalUrl} not found, or wrong http method` })
)

module.exports = router
