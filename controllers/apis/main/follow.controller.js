/* eslint-disable */
const followServices = requireWrapper('services/follow.services')
/* eslint-enable */

const followController = {
  addFollow: (req, res, next) => {
    const reqUserId = req.user.id
    const reqParamsId = req.params.id
    followServices.addFollow(reqUserId, reqParamsId, (err, data) => err ? next(err) : res.json({ status: 'success', data }))
  },
  removeFollow: (req, res, next) => {
    const reqUserId = req.user.id
    const reqParamsId = req.params.id
    followServices.removeFollow(reqUserId, reqParamsId, (err, data) => err ? next(err) : res.json({ status: 'success', data }))
  }
}

module.exports = followController
