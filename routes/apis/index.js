const router = require('express').Router()

router.use('/objectives', require('./objective.route'))
router.use('/', (req, res) => res.send('[apis] apiHandler'))

module.exports = router
