const router = require('express').Router()

router.use('/objectives', require('./objective.route'))
router.use('/', (req, res) => res.render('objectives'))

module.exports = router
