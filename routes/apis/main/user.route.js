const router = require('express').Router()

/* eslint-disable */
const userController = requireWrapper('controllers/apis/main/user.controller')
const upload = requireWrapper('middlewares/multer')
/* eslint-enable */

router.get('/:id/dashboard', userController.getDashboard)
router.put('/:id/update', upload.single('image'), userController.putUser)
router.get('/:id', userController.getUser)

module.exports = router
