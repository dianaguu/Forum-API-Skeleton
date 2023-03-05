const router = require('express').Router()

/* eslint-disable */
const accountController = requireWrapper('controllers/apis/account.controller')
/* eslint-enable */

router.use('/objectives', require('./objective.route'))

router.post('/signup', accountController.signUp)

router.use('/', (req, res) => res.send('[apis] apiHandler'))

module.exports = router
