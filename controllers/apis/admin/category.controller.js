/* eslint-disable */
const { Category } = requireWrapper('models')
const categoryServices = requireWrapper('services/category.services')
/* eslint-enable */

const categoryController = {
  getCategories: (req, res, next) => {
    const id = req.params.id
    categoryServices.getCategories(id, (err, data) => err ? next(err) : res.json({ status: 'success', data }))
  },
  postCategory: (req, res, next) => {
    const { name } = req.body
    categoryServices.postCategory(name, (err, data) => err ? next(err) : res.json({ status: 'success', data }))
  },
  putCategory: (req, res, next) => {
    const id = req.params.id
    const { name } = req.body
    categoryServices.putCategory(id, name, (err, data) => err ? next(err) : res.json({ status: 'success', data }))
  },
  deleteCategory: (req, res, next) => {
    const id = req.params.id
    categoryServices.deleteCategory(id, (err, data) => err ? next(err) : res.json({ status: 'success', data }))
  }
}

module.exports = categoryController
