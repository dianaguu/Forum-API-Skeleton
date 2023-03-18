/* eslint-disable */
const { Category } = requireWrapper('models')
/* eslint-enable */

const categoryServices = {
  getCategories: (id, callback) => {
    return Promise.all([
      Category.findAll({ raw: true }),
      id ? Category.findByPk(id, { raw: true }) : null
    ])
      .then(([categories, theCategory]) => callback(null, { categories, theCategory }))
      .catch(err => callback(err))
  },
  postCategory: async (name, callback) => {
    try {
      if (!name) throw new Error('Category name is required!')
      const foundCategory = await Category.findOne({ where: { name } })
      if (foundCategory) throw new Error(`${name} already exist!`)

      const createdCategory = await Category.create({ name })
      callback(null, { category: createdCategory })
    } catch (err) {
      callback(err)
    }
  },
  putCategory: async (id, name, callback) => {
    try {
      if (!name) throw new Error('Category name is required!')
      const foundCategory = await Category.findOne({ where: { name } })
      if (foundCategory) throw new Error(`${name} already exist!`)
      const theCategory = await Category.findByPk(id)
      if (!theCategory) throw new Error(`id ${id} doesn't exist!`)

      const updatedCategory = await theCategory.update({ name })
      callback(null, { category: updatedCategory })
    } catch (err) {
      callback(err)
    }
  }
}

module.exports = categoryServices
