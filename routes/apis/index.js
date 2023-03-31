const router = require('express').Router()

/* eslint-disable */
const { apiErrorHandler } = requireWrapper('middlewares/errorHandler')
const { requestAuthenticated } = requireWrapper('middlewares/apiAuthentication')
/* eslint-enable */

router.use('/v1/admin', require('./admin'))
router.use('/v1', require('./main'))

router.use('/', (req, res) =>
  res.status(400).json({ status: 'error', message: `${req.originalUrl} not found (attach a proper api version)` })
)

// error handler
router.use(apiErrorHandler)

module.exports = router
