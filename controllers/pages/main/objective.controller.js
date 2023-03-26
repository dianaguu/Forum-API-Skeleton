/* eslint-disable */
const objectiveServices = requireWrapper('services/objective.services')
/* eslint-enable */

const objectiveController = {
  getObjectivesWithPagination: (req, res, next) => {
    const user = req.user
    const categoryId = Number(req.query.categoryId) || ''

    const DEFAULT_LIMIT = 9
    const page = Number(req.query.page) || 1
    const limit = Number(req.query.limit) || DEFAULT_LIMIT

    objectiveServices.getObjectivesWithPagination(
      user,
      categoryId,
      page, limit,
      (err, data) => err ? next(err) : res.render('objectives', data))
  },
  getObjectiveWithComments: (req, res, next) => {
    const user = req.user
    const id = req.params.id
    objectiveServices.getObjectiveWithComments(user, id, (err, data) => err ? next(err) : res.render('objective', data))
  },
  getDashboard: (req, res, next) => {
    objectiveServices.getDashboard(req, (err, data) => err ? next(err) : res.render('dashboard', data))
  },
  getTopTen: (req, res, next) => {
    const reqUser = req.user
    objectiveServices.getTopTen(reqUser, (err, data) => err ? next(err) : res.render('objective-top-ten', data))
  },
  getFeed: (req, res, next) => {
    objectiveServices.getFeed(req, (err, data) => err ? next(err) : res.render('feed', data))
    // objectiveServices.getFeed(req, res, next)
  }
}

module.exports = objectiveController
