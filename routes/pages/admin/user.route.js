const router = require('express').Router()

/* eslint-disable */
const userController = requireWrapper('controllers/pages/admin/user.controller')
/* eslint-enable */

router.patch('/:id', userController.patchUser)
router.get('/', userController.getUsers)

// admin/categories
router.use('/', (req, res) => res.redirect('/admin/users'))

module.exports = router
