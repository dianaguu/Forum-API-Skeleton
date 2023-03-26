/* eslint-disable */
const objectiveServices = requireWrapper('services/objective.services')
/* eslint-enable */

const objectiveController = {
  getObjectives: (req, res, next) => {
    const categoryId = ''
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
  postObjective: (req, res, next) => {
    objectiveServices.postObjective(req, (err, data) => err ? next(err) : res.json({ status: 'success', data }))
  },
  getObjective: (req, res, next) => {
    objectiveServices.getObjective(req, (err, data) => err ? next(err) : res.json({ status: 'success', data }))
  },
  putObjective: (req, res, next) => {
    objectiveServices.putObjective(req, (err, data) => err ? next(err) : res.json({ status: 'success', data }))
  },
  deleteObjective: (req, res, next) => {
    objectiveServices.deleteObjective(req, (err, data) => err ? next(err) : res.json({ status: 'success', data }))
  }
}

module.exports = objectiveController
