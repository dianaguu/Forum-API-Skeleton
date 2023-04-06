const router = require('express').Router()

/* eslint-disable */
const accountController = requireWrapper('controllers/apis/main/account.controller')
const { accountAuthenticated, requestAuthenticated } = requireWrapper('middlewares/apiAuthentication')
/* eslint-enable */

// objective
router.use('/objectives', requestAuthenticated, require('./objective.route'))
// comment
router.use('/comments', requestAuthenticated, require('./comment.route'))

// favorite
router.use('/favorite', requestAuthenticated, require('./favorite.route'))
// like
router.use('/like', requestAuthenticated, require('./like.route'))

// user
router.use('/users', requestAuthenticated, require('./user.route'))

// account
router.post('/signup', accountController.signUp)
router.post('/signin', accountAuthenticated, accountController.signIn)

router.use('/', requestAuthenticated, (req, res) =>
  res.status(400).json({ status: 'error', message: `${req.originalUrl} not found, or wrong http method` })
)

module.exports = router
