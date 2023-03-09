const router = require('express').Router()

/* eslint-disable */
const { pageErrorHandler } = requireWrapper('middlewares/errorHandler')
/* eslint-enable */

router.use('/admin', require('./admin'))
router.use('/', require('./main'))

// error handler
router.use(pageErrorHandler)

module.exports = router
