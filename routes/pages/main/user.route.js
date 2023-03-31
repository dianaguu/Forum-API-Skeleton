const router = require('express').Router()

/* eslint-disable */
const userController = requireWrapper('controllers/pages/main/user.controller')
const upload = requireWrapper('middlewares/multer')
/* eslint-enable */

router.put('/:id', upload.single('image'), userController.putUser)
router.get('/:id/edit', userController.editUser)
router.get('/:id', userController.getUser)

module.exports = router
