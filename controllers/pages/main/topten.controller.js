
/* eslint-disable */
const toptenServices = requireWrapper('services/topten.services')
/* eslint-enable */

const topTenController = {
  getObjectives: (req, res, next) => {
    const reqUserId = req.user.id
    toptenServices.getObjectives(reqUserId, (err, data) => err ? next(err) : res.render('top-ten-objectives', data))
  },
  getFollowings: (req, res, next) => {
    const reqUserId = req.user.id
    toptenServices.getFollowings(reqUserId, (err, data) => err ? next(err) : res.render('top-ten-followings', data))
  }
}

module.exports = topTenController
