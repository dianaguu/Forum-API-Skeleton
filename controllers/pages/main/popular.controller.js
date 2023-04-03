
/* eslint-disable */
const popularServices = requireWrapper('services/popular.services')
/* eslint-enable */

const MN_RECORDS_LIMIT = 10

const popularController = {
  getObjectives: (req, res, next) => {
    popularServices.getObjectives(req.user.id, MN_RECORDS_LIMIT, (err, data) =>
      err ? next(err) : res.render('popular-objectives', data))
  },
  getFollowings: (req, res, next) => {
    popularServices.getFollowings(req.user.id, MN_RECORDS_LIMIT, (err, data) =>
      err ? next(err) : res.render('popular-followings', data))
  }
}

module.exports = popularController
