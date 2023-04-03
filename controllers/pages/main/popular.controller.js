
/* eslint-disable */
const popularServices = requireWrapper('services/popular.services')
/* eslint-enable */

const popularController = {
  getObjectives: (req, res, next) => {
    const reqUserId = req.user.id
    popularServices.getObjectives(reqUserId, (err, data) => err ? next(err) : res.render('popular-objectives', data))
  },
  getFollowings: (req, res, next) => {
    const reqUserId = req.user.id
    popularServices.getFollowings(reqUserId, (err, data) => err ? next(err) : res.render('popular-followings', data))
  }
}

module.exports = popularController
