const router = require('express').Router()

/* eslint-disable */
const { requestAuthenticated } = requireWrapper('middlewares/apiAuthentication')
/* eslint-enable */

router.use('/objectives', requestAuthenticated, require('./objective.route'))

router.use('/comments', requestAuthenticated, require('./comment.route'))

router.use('/favorite', requestAuthenticated, require('./favorite.route'))
router.use('/like', requestAuthenticated, require('./like.route'))
router.use('/follow', requestAuthenticated, require('./follow.route'))

router.use('/popular', requestAuthenticated, require('./popular.route'))
router.use('/feed', requestAuthenticated, require('./feed.route'))

router.use('/users', requestAuthenticated, require('./user.route'))
router.use('/account', require('./account.route'))

router.use('/', requestAuthenticated, (req, res) =>
  res.status(400).json({ status: 'error', message: `${req.originalUrl} not found, or wrong http method` })
)

module.exports = router
