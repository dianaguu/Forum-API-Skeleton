/* eslint-disable */
const userServices = requireWrapper('services/user.services')
/* eslint-enable */

const userController = {
  getUser: (req, res, next) => {
    userServices.getUser(req.user.id, req.params.id, (err, data) => {
      if (err) return next(err)
      if (req.baseUrl.match('/api/v./users')) return res.json({ status: 'success', data })
      req.analysisData = data.user
      next()
    })
  },
  putUser: (req, res, next) => {
    userServices.putUser(
      req.user.id,
      req.params.id,
      req.body.name,
      req.file,
      (err, data) => {
        if (err) return next(err)
        delete data.user.password
        res.json({ status: 'success', data })
      })
  },
  getDashboard: (req, res, next) => {
    userServices.getUser(req.user.id, req.params.id, (err, data) => {
      if (err) return next(err)
      return res.json({
        status: 'success',
        data: {
          favoritedObjectives: Object.keys(data.user.FavoriteObjectives).length,
          followers: Object.keys(data.user.Followers).length,
          followings: Object.keys(data.user.Followings).length,
          comments: Object.keys(data.user.Comments).length,
          commentedObjectives: Object.keys(data.user.CommentObjectives).length
        }
      })
    })
  }
}

module.exports = userController
