/* eslint-disable */
const objectiveServices = requireWrapper('services/objective.services')
/* eslint-enable */

const objectiveController = {
  getObjectives: (req, res, next) => {
    objectiveServices.getObjectives(req, (err, data) => err ? next(err) : res.json({ status: 'success', data }))
  },
  postObjective: (req, res, next) => {
    objectiveServices.postObjective(req, (err, data) => err ? next(err) : res.json({ status: 'success', data }))
  }
}

module.exports = objectiveController
