const router = require('express').Router()

/* eslint-disable */
const categoryController = requireWrapper('controllers/apis/admin/category.controller')
/* eslint-enable */

router.post('/', categoryController.postCategory)
router.put('/:id', categoryController.putCategory)
router.delete('/:id', categoryController.deleteCategory)
router.get('/', categoryController.getCategories)

module.exports = router
