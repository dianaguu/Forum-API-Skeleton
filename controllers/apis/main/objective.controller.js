/* eslint-disable */
const objectiveServices = requireWrapper('services/objective.services')
/* eslint-enable */

const objectiveController = {
  getObjectives: (req, res, next) => {
    const categoryId = Number(req.query.categoryId) || ''
    objectiveServices.getObjectives(categoryId, (err, data) => {
      if (err) return next(err)
      return res.json({
        status: 'success',
        data: {
          count: Object.keys(data.objectives).length,
          objectives: data.objectives
        }
      })
    })
  },
  getObjectiveWithComments: (req, res, next) => {
    const user = req.user
    const id = req.params.id
    objectiveServices.getObjectiveWithComments(user, id, (err, data) => err ? next(err) : res.json({ status: 'success', data }))
  }
}

module.exports = objectiveController
