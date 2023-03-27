const router = require('express').Router()

/* eslint-disable */
const userController = requireWrapper('controllers/apis/admin/user.controller')
/* eslint-enable */

router.patch('/:id', userController.patchUser)
router.get('/:id', userController.getUser)
router.get('/', userController.getUsers)

module.exports = router
