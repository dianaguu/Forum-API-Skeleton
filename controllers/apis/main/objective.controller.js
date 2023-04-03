/* eslint-disable */
const objectiveServices = requireWrapper('services/objective.services')
/* eslint-enable */

const objectiveController = {
  getObjectivesWithPagination: (req, res, next) => {
    const categoryId = Number(req.query.categoryId) || ''

    const page = Number(req.query.page) || 1
    const limit = Number(req.query.limit) || 0

    objectiveServices.getObjectivesWithPagination(req.user, categoryId, page, limit,
      (err, data) => {
        if (err) return next(err)

        let nextPage = ''
        if (data.pagination.nextPage !== data.pagination.currentPage) {
          nextPage = `/api/v1/objectives?limit=${limit}&page=${data.pagination.nextPage}&categoryId=${categoryId}`
        }
        if (page > data.pagination.pages.at(-1)) {
          return next(err)
        }

        return res.json({
          status: 'success',
          data: {
            count: Object.keys(data.objectives).length,
            objectives: data.objectives,
            'next page': nextPage || 'this is the last page'
          }
        })
      })
  },
  getObjectiveWithDetail: (req, res, next) => {
    objectiveServices.getObjectiveWithDetail(req.user, req.params.id, (err, data) => {
      if (err) return next(err)
      delete data.user
      if (req.baseUrl.match('/api/v./objectives')) return res.json({ status: 'success', data })
      req.analysisData = data.objective
      next()
    })
  },
  getDashboard: (req, res, next) => {
    objectiveServices.getDashboard(req.params.id, (err, data) => {
      if (err) return next(err)
      return res.json({
        status: 'success',
        data: {
          'objective id': data.objective.id,
          'objective name': data.objective.name,
          views: data.objective.views,
          comments: Object.keys(data.objective.Comments).length,
          favorites: Object.keys(data.objective.FavoriteUsers).length,
          likes: Object.keys(data.objective.LikeUsers).length
        }
      })
    })
  }
}

module.exports = objectiveController
