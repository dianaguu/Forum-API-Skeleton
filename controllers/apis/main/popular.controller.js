/* eslint-disable */
const popularServices = requireWrapper('services/popular.services')
/* eslint-enable */

const popularController = {
  getObjectives: (req, res, next) => {
    popularServices.getObjectives(req.user, req.query.limit, (err, data) => {
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
  getFollowings: (req, res, next) => {
    popularServices.getFollowings(req.user, req.query.limit, (err, data) => {
      if (err) return next(err)
      return res.json({
        status: 'success',
        data: {
          count: Object.keys(data.users).length,
          followings: data.users
        }
      })
    })
  }
}

module.exports = popularController
