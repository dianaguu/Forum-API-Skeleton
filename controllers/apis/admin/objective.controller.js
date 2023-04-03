/* eslint-disable */
const objectiveServices = requireWrapper('services/objective.services')
/* eslint-enable */

const objectiveController = {
  postObjective: (req, res, next) => {
    objectiveServices.postObjective(
      req.file,
      req.body.name,
      req.body.telephone,
      req.body.address,
      req.body.openingHours,
      req.body.description,
      req.body.categoryId,
      (err, data) => err ? next(err) : res.status(201).json({ status: 'success', data }))
  },
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
  getObjective: (req, res, next) => {
    objectiveServices.getObjective(req.params.id, (err, data) => err ? next(err) : res.json({ status: 'success', data }))
  },
  putObjective: (req, res, next) => {
    objectiveServices.putObjective(
      req.params.id,
      req.file,
      req.body.name,
      req.body.telephone,
      req.body.address,
      req.body.openingHours,
      req.body.description,
      req.body.categoryId,
      (err, data) => err ? next(err) : res.json({ status: 'success', data }))
  },
  deleteObjective: (req, res, next) => {
    objectiveServices.deleteObjective(req.params.id, (err, data) => err ? next(err) : res.json({ status: 'success', 'deleted data': data }))
  }
}

module.exports = objectiveController
