const router = require('express').Router()

/* eslint-disable */
const userController = requireWrapper('controllers/apis/admin/user.controller')
/* eslint-enable */

const matchQueryString = function (req, res, next) {
  return next(req.query.isAdmin ? null : 'route')
}

router.patch('/:id', userController.patchUser)
router.get('/', matchQueryString, userController.getAdminUsers)
router.get('/', userController.getUsers)

module.exports = router
