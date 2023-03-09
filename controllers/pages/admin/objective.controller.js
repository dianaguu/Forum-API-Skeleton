/* eslint-disable */
const { Objective } = requireWrapper('models')
/* eslint-enable */

const objectiveController = {
  getObjectives: (req, res, next) => {
    Objective.findAll({ raw: true })
      .then(objectives => res.render('admin/objectives', { objectives }))
      .catch(err => next(err))
  },
  createObjective: (req, res) => {
    return res.render('admin/objective-create-form')
  },
  postObjective: (req, res, next) => {
    const { name, telephone, address, openingHours, description } = req.body
    if (!name) throw new Error('Objective name is required!')
    Objective.create({
      name,
      telephone,
      address,
      openingHours,
      description
    })
      .then(() => {
        req.flash('success_messages', 'objective was created successfully')
        res.redirect('/admin/objectives')
      })
      .catch(err => next(err))
  }
}

module.exports = objectiveController
