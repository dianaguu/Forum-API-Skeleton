/* eslint-disable */
const { User } = requireWrapper('models')
const userServices = requireWrapper('services/user.services')
/* eslint-enable */

const userController = {
  getUser: (req, res, next) => {
    const reqUserId = req.user.id
    const reqParamsId = req.params.id
    userServices.getUser(reqUserId, reqParamsId, (err, data) => err ? next(err) : res.render('users/profile', data))
  },
  editUser: (req, res, next) => {
    return User.findByPk(req.params.id)
      .then(user => {
        if (!user) throw new Error("User didn't exist!")
        res.render('users/user-edit-form', { user: user.toJSON() })
      })
      .catch(err => next(err))
  },
  putUser: (req, res, next) => {
    const reqUserId = req.user.id
    const reqParamsId = req.params.id
    const reqBodyName = req.body.name
    const reqFile = req.file
    userServices.putUser(reqUserId, reqParamsId, reqBodyName, reqFile, (err, data) =>
      err ? next(err) : res.redirect(`/users/${reqParamsId}`))
  }
}

module.exports = userController
