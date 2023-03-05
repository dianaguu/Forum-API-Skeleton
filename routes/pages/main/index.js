const router = require('express').Router()

/* eslint-disable */
const accountController = requireWrapper('controllers/pages/main/account.controller')
/* eslint-enable */

router.use('/objectives', require('./objective.route'))

router.get('/signup', accountController.signUpPage)
router.post('/signup', accountController.signUp)

router.use('/', (req, res) => res.render('objectives'))

module.exports = router
