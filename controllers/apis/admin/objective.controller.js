/* eslint-disable */
const objectiveServices = requireWrapper('services/objective.services')
/* eslint-enable */

const objectiveController = {
  getObjectives: (req, res, next) => {
    objectiveServices.getObjectives(req, (err, data) => err ? next(err) : res.json({ status: 'success', data }))
  },
  postObjective: (req, res, next) => {
    objectiveServices.postObjective(req, (err, data) => err ? next(err) : res.json({ status: 'success', data }))
  },
  putObjective: (req, res, next) => {
    objectiveServices.putObjective(req, (err, data) => err ? next(err) : res.json({ status: 'success', data }))
  },
  deleteObjective: (req, res, next) => {
    objectiveServices.deleteObjective(req, (err, data) => err ? next(err) : res.json({ status: 'success', data }))
  }
}

module.exports = objectiveController
