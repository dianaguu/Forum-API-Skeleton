const router = require('express').Router()

/* eslint-disable */
const { requestAuthenticatedAdmin } = requireWrapper('middlewares/pageAuthentication')
/* eslint-enable */

// objective
router.use('/objectives', requestAuthenticatedAdmin, require('./objective.route'))
router.use('/categories', requestAuthenticatedAdmin, require('./category.route'))
router.use('/users', requestAuthenticatedAdmin, require('./user.route'))

// admin root
router.use('/', requestAuthenticatedAdmin, (req, res) => res.redirect('/admin/objectives'))

module.exports = router
