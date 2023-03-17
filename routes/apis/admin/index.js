const router = require('express').Router()

/* eslint-disable */
const { requestAuthenticated, requestAuthenticatedAdmin } = requireWrapper('middlewares/apiAuthentication')
/* eslint-enable */

// objective
router.use('/objectives', requestAuthenticated, requestAuthenticatedAdmin, require('./objective.route'))
router.use('/categories', requestAuthenticated, requestAuthenticatedAdmin, require('./category.route'))

router.use('/', (req, res) =>
  res.status(400).json({ status: 'error', message: `${req.originalUrl} not found, or wrong http method` })
)

module.exports = router
