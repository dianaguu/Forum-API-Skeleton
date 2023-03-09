const router = require('express').Router()

/* eslint-disable */
const { requestAuthenticatedAdmin } = requireWrapper('middlewares/pageAuthentication')
/* eslint-enable */

// objective
router.use('/objectives', requestAuthenticatedAdmin, require('./objective.route'))

// admin root
router.use('/', requestAuthenticatedAdmin, (req, res) => res.render('admin/objectives'))

module.exports = router
