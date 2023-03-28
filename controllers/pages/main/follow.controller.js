/* eslint-disable */
const followServices = requireWrapper('services/follow.services')
/* eslint-enable */

const followController = {
  addFollow: (req, res, next) => {
    const reqUserId = req.user.id
    const reqParamsId = req.params.id
    followServices.addFollow(reqUserId, reqParamsId, (err, data) => {
      if (err) return next(err)
      req.session.addedData = data
      return res.redirect('back')
    })
  },
  removeFollow: (req, res, next) => {
    const reqUserId = req.user.id
    const reqParamsId = req.params.id
    followServices.removeFollow(reqUserId, reqParamsId, (err, data) => {
      if (err) return next(err)
      req.session.removedData = data
      return res.redirect('back')
    })
  }
}

module.exports = followController
