const router = require('express').Router()

/* eslint-disable */
const passport = requireWrapper('configs/passport')
const accountController = requireWrapper('controllers/pages/main/account.controller')
const { requestAuthenticated } = requireWrapper('middlewares/pageAuthentication')
/* eslint-enable */

// objective
router.use('/objectives', requestAuthenticated, require('./objective.route'))
// comment
router.use('/comments', requestAuthenticated, require('./comment.route'))

// account
router.get('/signup', accountController.signUpPage)
router.post('/signup', accountController.signUp)
router.get('/signin', accountController.signInPage)
router.post('/signin',
  passport.authenticate('local', { failureRedirect: '/signin', failureFlash: true }),
  accountController.signIn)
router.post('/signoff', accountController.signOff)

// main root
router.use('/', requestAuthenticated, (req, res) => res.redirect('/objectives'))

module.exports = router
