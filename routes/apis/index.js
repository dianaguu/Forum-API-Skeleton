const router = require('express').Router()

/* eslint-disable */
const { apiErrorHandler } = requireWrapper('middlewares/errorHandler')
/* eslint-enable */

router.use('/admin', require('./admin'))
router.use('/', require('./main'))

// error handler
router.use(apiErrorHandler)

module.exports = router
