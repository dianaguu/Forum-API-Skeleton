
/* eslint-disable */
const toptenServices = requireWrapper('services/topten.services')
/* eslint-enable */

const topTenController = {
  getObjectives: (req, res, next) => {
    const reqUserId = req.user.id
    toptenServices.getObjectives(reqUserId, (err, data) => err ? next(err) : res.render('top-ten-objectives', data))
  },
  getFollowings: (req, res, next) => {
    toptenServices.getFollowings((err, data) => err ? next(err) : res.render('top-ten-followings', data))
  }
}

module.exports = topTenController
