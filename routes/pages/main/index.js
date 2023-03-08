const router = require('express').Router()

/* eslint-disable */
const passport = requireWrapper('configs/passport')
const accountController = requireWrapper('controllers/pages/main/account.controller')
const { pageErrorHandler } = requireWrapper('middlewares/errorHandler')
/* eslint-enable */

router.use('/objectives', require('./objective.route'))

router.get('/signup', accountController.signUpPage)
router.post('/signup', accountController.signUp)
router.get('/signin', accountController.signInPage)
router.post('/signin',
  passport.authenticate('local', { failureRedirect: '/signin', failureFlash: true }),
  accountController.signIn)
router.post('/signoff', accountController.signOff)
router.use('/', pageErrorHandler)

module.exports = router
