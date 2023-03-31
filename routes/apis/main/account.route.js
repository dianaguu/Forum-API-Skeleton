const router = require('express').Router()

/* eslint-disable */
const accountController = requireWrapper('controllers/apis/main/account.controller')
const { accountAuthenticated, requestAuthenticated } = requireWrapper('middlewares/apiAuthentication')
/* eslint-enable */

router.post('/signup', accountController.signUp)
router.post('/signin', accountAuthenticated, accountController.signIn)
router.post('/signoff', requestAuthenticated, accountController.signOff)

module.exports = router
