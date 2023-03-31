const router = require('express').Router()

/* eslint-disable */
const categoryController = requireWrapper('controllers/pages/admin/category.controller')
/* eslint-enable */

router.get('/:id/edit', categoryController.getCategories)
router.put('/:id', categoryController.putCategory)
router.delete('/:id', categoryController.deleteCategory)
router.post('/', categoryController.postCategory)
router.get('/', categoryController.getCategories)

// admin/categories
router.use('/', (req, res) => res.redirect('/forum/admin/categories'))

module.exports = router
