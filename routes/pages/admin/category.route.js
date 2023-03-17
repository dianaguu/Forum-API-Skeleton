const router = require('express').Router()

/* eslint-disable */
const categoryController = requireWrapper('controllers/pages/admin/category.controller')
/* eslint-enable */

router.post('/create', categoryController.postCategory)
router.get('/', categoryController.getCategories)

module.exports = router
