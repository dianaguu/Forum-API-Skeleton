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
  getObjective: (req, res, next) => {
    objectiveServices.getObjective(req, (err, data) => err ? next(err) : res.render('objective', data))
  }
}

module.exports = objectiveController
