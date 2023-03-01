const router = require('express').Router()

router.use('/admin', require('./admin'))
router.use('/', require('./main'))

module.exports = router
