const router = require('express').Router()

/* eslint-disable */
const { pageErrorHandler } = requireWrapper('middlewares/errorHandler')
const { requestAuthenticatedAdmin } = requireWrapper('middlewares/pageAuthentication')
/* eslint-enable */

router.use('/objectives', requestAuthenticatedAdmin, require('./objective.route'))

router.use('/', requestAuthenticatedAdmin, (req, res) => res.render('admin/objectives'))
router.use('/', pageErrorHandler)

module.exports = router
