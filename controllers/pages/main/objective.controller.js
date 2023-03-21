/* eslint-disable */
const objectiveServices = requireWrapper('services/objective.services')
/* eslint-enable */

const objectiveController = {
  getObjectivesWithCategoryIdAndPagination: (req, res, next) => {
    const categoryId = Number(req.query.categoryId) || ''

    const DEFAULT_LIMIT = 9
    const page = Number(req.query.page) || 1
    const limit = Number(req.query.limit) || DEFAULT_LIMIT

    objectiveServices.getObjectivesWithCategoryIdAndPagination(
      categoryId,
      page, limit,
      (err, data) => err ? next(err) : res.render('objectives', data))
  },
  getObjectiveWithComments: (req, res, next) => {
    const id = req.params.id
    objectiveServices.getObjectiveWithComments(id, (err, data) => err ? next(err) : res.render('objective', data))
  },
  getDashboard: (req, res, next) => {
    objectiveServices.getDashboard(req, (err, data) => err ? next(err) : res.render('dashboard', data))
  }
}

module.exports = objectiveController
