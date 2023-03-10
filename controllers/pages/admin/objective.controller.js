/* eslint-disable */
const { Objective } = requireWrapper('models')
const objectiveServices = requireWrapper('services/objective.services')
/* eslint-enable */

const objectiveController = {
  getObjectives: (req, res, next) => {
    objectiveServices.getObjectives(req, (err, data) => err ? next(err) : res.render('admin/objectives', data))
  },
  createObjective: (req, res) => {
    return res.render('admin/objective-create-form')
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
    Objective.findByPk(req.params.id, { raw: true })
      .then(objective => {
        if (!objective) throw new Error("Objective didn't exist!")
        res.render('admin/objective', { objective })
      })
      .catch(err => next(err))
  },
  editObjective: (req, res, next) => {
    Objective.findByPk(req.params.id, { raw: true })
      .then(objective => {
        if (!objective) throw new Error("Objective didn't exist!")
        res.render('admin/objective-edit-form', { objective })
      })
      .catch(err => next(err))
  },
  putObjective: (req, res, next) => {
    const { name, telephone, address, openingHours, description } = req.body
    if (!name) throw new Error('Objective name is required!')
    Objective.findByPk(req.params.id)
      .then(objective => {
        if (!objective) throw new Error("Objective didn't exist!")
        return objective.update({
          name,
          telephone,
          address,
          openingHours,
          description
        })
      })
      .then(() => {
        req.flash('success_messages', 'Objective was updated successfully')
        res.redirect('/admin/objectives')
      })
      .catch(err => next(err))
  },
  deleteObjective: (req, res, next) => {
    return Objective.findByPk(req.params.id)
      .then(objective => {
        if (!objective) throw new Error("Objective didn't exist!")
        return objective.destroy()
      })
      .then(() => res.redirect('/admin/objectives'))
      .catch(err => next(err))
  }
}

module.exports = objectiveController
