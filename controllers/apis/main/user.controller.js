/* eslint-disable */
const userServices = requireWrapper('services/user.services')
/* eslint-enable */

const userController = {
  getUser: (req, res, next) => {
    const reqUserId = req.user.id
    const reqParamsId = req.params.id
    userServices.getUser(reqUserId, reqParamsId, (err, data) => err ? next(err) : res.json({ status: 'success', data }))
  },
  putUser: (req, res, next) => {
    const reqUserId = req.user.id
    const reqParamsId = req.params.id
    const reqBodyName = req.body.name
    const reqFile = req.file
    userServices.putUser(reqUserId, reqParamsId, reqBodyName, reqFile, (err, data) =>
      err ? next(err) : res.json({ status: 'success', data }))
  }
}

module.exports = userController
