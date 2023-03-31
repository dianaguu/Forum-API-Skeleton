/* eslint-disable */
const { Category } = requireWrapper('models')
const categoryServices = requireWrapper('services/category.services')
/* eslint-enable */

const categoryController = {
  getCategories: (req, res, next) => {
    const id = req.params.id
    categoryServices.getCategories(id, (err, data) => err ? next(err) : res.render('admin/categories', data))
  },
  postCategory: (req, res, next) => {
    const { name } = req.body
    categoryServices.postCategory(name, (err, data) => {
      if (err) return next(err)
      req.flash('success_messages', 'Category was successfully created')
      req.session.createdData = data
      return res.redirect('/forum/admin/categories')
    })
  },
  putCategory: (req, res, next) => {
    const id = req.params.id
    const { name } = req.body
    categoryServices.putCategory(id, name, (err, data) => {
      if (err) return next(err)
      req.flash('success_messages', 'Category was successfully updated')
      req.session.updatedData = data
      return res.redirect('/forum/admin/categories')
    })
  },
  deleteCategory: (req, res, next) => {
    const id = req.params.id
    categoryServices.deleteCategory(id, (err, data) => {
      if (err) return next(err)
      req.session.deletedData = data
      return res.redirect('/forum/admin/categories')
    })
  }
}

module.exports = categoryController
