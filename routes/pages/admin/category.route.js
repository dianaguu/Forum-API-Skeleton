const router = require('express').Router()

/* eslint-disable */
const categoryController = requireWrapper('controllers/pages/admin/category.controller')
/* eslint-enable */

router.post('/create', categoryController.postCategory)
router.put('/:id/update', categoryController.putCategory)
router.get('/:id/edit', categoryController.getCategories)
router.get('/', categoryController.getCategories)

// admin/categories
router.use('/', (req, res) => res.redirect('/admin/categories'))

module.exports = router
