const router = require('express').Router()

/* eslint-disable */
const accountController = requireWrapper('controllers/apis/account.controller')
const { accountAuthenticated } = requireWrapper('middlewares/apiAuthentication')
const { apiErrorHandler } = requireWrapper('middlewares/errorHandler')
/* eslint-enable */

router.use('/objectives', require('./objective.route'))

router.post('/signup', accountController.signUp)
router.post('/signin', accountAuthenticated, accountController.signIn)

router.use('/', apiErrorHandler)

module.exports = router
