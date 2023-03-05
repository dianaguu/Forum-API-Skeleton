const router = require('express').Router()

/* eslint-disable */
const accountController = requireWrapper('controllers/pages/main/account.controller')
const { pageErrorHandler } = requireWrapper('middlewares/errorHandler')
/* eslint-enable */

router.use('/objectives', require('./objective.route'))

router.get('/signup', accountController.signUpPage)
router.post('/signup', accountController.signUp)

router.use('/', pageErrorHandler)

module.exports = router
