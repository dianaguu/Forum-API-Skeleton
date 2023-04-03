/* eslint-disable */
const objectiveServices = requireWrapper('services/objective.services')
/* eslint-enable */

const objectiveController = {
  getObjectivesWithPagination: (req, res, next) => {
    const categoryId = Number(req.query.categoryId) || ''

    const MN_RECORDS_LIMIT = 9
    const page = Number(req.query.page) || 1
    const limit = Number(req.query.limit) || MN_RECORDS_LIMIT

    objectiveServices.getObjectivesWithPagination(req.user, categoryId, page, limit,
      (err, data) => err ? next(err) : res.render('objectives', data))
  },
  getObjectiveWithDetail: (req, res, next) => {
    objectiveServices.getObjectiveWithDetail(req.user, req.params.id, (err, data) => err ? next(err) : res.render('objective', data))
  },
  getDashboard: (req, res, next) => {
    objectiveServices.getDashboard(req.params.id, (err, data) => err ? next(err) : res.render('dashboard', data))
  }
}

module.exports = objectiveController
