const router = require('express').Router()

/* eslint-disable */
const { requestAuthenticated } = requireWrapper('middlewares/pageAuthentication')
/* eslint-enable */

router.use('/objectives', requestAuthenticated, require('./objective.route'))

router.use('/comments', requestAuthenticated, require('./comment.route'))

router.use('/favorite', requestAuthenticated, require('./favorite.route'))
router.use('/like', requestAuthenticated, require('./like.route'))
router.use('/follow', requestAuthenticated, require('./follow.route'))

router.use('/topten', requestAuthenticated, require('./topten.route'))
router.use('/newsfeed', requestAuthenticated, require('./newsfeed.route'))

router.use('/users', requestAuthenticated, require('./user.route'))
router.use('/account', require('./account.route'))

// main root
router.use('/', requestAuthenticated, (req, res) => res.redirect('/forum/objectives'))

module.exports = router
