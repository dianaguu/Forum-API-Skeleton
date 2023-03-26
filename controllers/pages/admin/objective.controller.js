/* eslint-disable */
const { Objective, Category } = requireWrapper('models')
const objectiveServices = requireWrapper('services/objective.services')
/* eslint-enable */

const objectiveController = {
  getObjectives: (req, res, next) => {
    const categoryId = ''
    objectiveServices.getObjectives(categoryId, (err, data) => err ? next(err) : res.render('admin/objectives', data))
  },
  createObjective: (req, res, next) => {
    return Category.findAll({
      raw: true
    })
      .then(categories => res.render('admin/objective-create-form', { categories }))
      .catch(err => next(err))
  },
  postObjective: (req, res, next) => {
    objectiveServices.postObjective(req, (err, data) => {
      if (err) return next(err)
      req.flash('success_messages', 'objective was successfully created')
      req.session.createdData = data
      return res.redirect('/admin/objectives')
    })
  },
  getObjective: (req, res, next) => {
    objectiveServices.getObjective(req, (err, data) => err ? next(err) : res.render('admin/objective', data))
  },
  editObjective: (req, res, next) => {
    return Promise.all([
      Objective.findByPk(req.params.id, { raw: true }),
      Category.findAll({ raw: true })
    ])
      .then(([objective, categories]) => {
        if (!objective) throw new Error("Objective didn't exist!")
        res.render('admin/objective-edit-form', { objective, categories })
      })
      .catch(err => next(err))
  },
  putObjective: (req, res, next) => {
    objectiveServices.putObjective(req, (err, data) => {
      if (err) return next(err)
      req.flash('success_messages', 'Objective was updated successfully')
      req.session.updatedData = data
      return res.redirect('/admin/objectives')
    })
  },
  deleteObjective: (req, res, next) => {
    objectiveServices.deleteObjective(req, (err, data) => {
      if (err) return next(err)
      req.session.deletedData = data
      return res.redirect('/admin/objectives')
    })
  }
}

module.exports = objectiveController
