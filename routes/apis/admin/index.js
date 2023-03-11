const router = require('express').Router()

/* eslint-disable */
const { requestAuthenticated, requestAuthenticatedAdmin } = requireWrapper('middlewares/apiAuthentication')
/* eslint-enable */

// objective
router.use('/objectives', requestAuthenticated, requestAuthenticatedAdmin, require('./objective.route'))

router.use('/', (req, res) =>
  res.status(404).json({ status: 'error', message: `${req.originalUrl} not found` })
)

module.exports = router
