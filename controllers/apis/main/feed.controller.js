/* eslint-disable */
const feedServices = requireWrapper('services/feed.services')
/* eslint-enable */

const feedController = {
  getObjectives: (req, res, next) => {
    feedServices.getObjectives(req.query.limit, (err, data) => {
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
  getComments: (req, res, next) => {
    feedServices.getComments(req.query.limit, (err, data) => {
      if (err) return next(err)
      return res.json({
        status: 'success',
        data: {
          count: Object.keys(data.comments).length,
          comments: data.comments
        }
      })
    })
  }
}

module.exports = feedController
