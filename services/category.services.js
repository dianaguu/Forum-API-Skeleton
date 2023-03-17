/* eslint-disable */
const { Category } = requireWrapper('models')
/* eslint-enable */

const categoryServices = {
  getCategories: (req, callback) => {
    return Category.findAll({
      raw: true
    })
      .then(categories => callback(null, { categories }))
      .catch(err => callback(err))
  },
  postCategory: (req, callback) => {
    const { name } = req.body
    if (!name) throw new Error('Category name is required!')
    return Category.create({ name })
      .then(createdCategory => callback(null, { category: createdCategory }))
      .catch(err => callback(err))
  }
}

module.exports = categoryServices
