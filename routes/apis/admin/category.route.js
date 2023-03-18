const router = require('express').Router()

/* eslint-disable */
const categoryController = requireWrapper('controllers/apis/admin/category.controller')
/* eslint-enable */

router.post('/create', categoryController.postCategory)
router.put('/:id/update', categoryController.putCategory)
router.get('/', categoryController.getCategories)

module.exports = router
