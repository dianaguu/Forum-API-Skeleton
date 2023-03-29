/* eslint-disable */
const userServices = requireWrapper('services/user.services')
/* eslint-enable */

const userController = {
  getUser: (req, res, next) => {
    const reqUserId = req.user.id
    const reqParamsId = req.params.id
    userServices.getUser(reqUserId, reqParamsId, (err, data) => {
      if (err) return next(err)
      req.baseUrl === '/api/users' ? res.json({ status: 'success', data }) : req.analysisData = data
      next()
    })
  },
  putUser: (req, res, next) => {
    const reqUserId = req.user.id
    const reqParamsId = req.params.id
    const reqBodyName = req.body.name
    const reqFile = req.file
    userServices.putUser(reqUserId, reqParamsId, reqBodyName, reqFile, (err, data) =>
      err ? next(err) : res.json({ status: 'success', data }))
  },
  getDashboard: (req, res, next) => {
    const reqUserId = req.user.id
    const reqParamsId = req.params.id
    userServices.getUser(reqUserId, reqParamsId, (err, data) => {
      if (err) return next(err)
      return res.json({
        status: 'success',
        data: {
          comments: Object.keys(data.user.Comments).length,
          'commented objectives': Object.keys(data.user.CommentObjectives).length,
          'favorited objectives': Object.keys(data.user.FavoriteObjectives).length,
          followers: Object.keys(data.user.Followers).length,
          followings: Object.keys(data.user.Followings).length
        }
      })
    })
  }
}

module.exports = userController
