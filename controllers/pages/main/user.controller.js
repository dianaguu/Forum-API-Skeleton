/* eslint-disable */
const { User } = requireWrapper('models')
const userServices = requireWrapper('services/user.services')
/* eslint-enable */

const userController = {
  getUser: (req, res, next) => {
    const id = req.params.id
    userServices.getUser(id, (err, data) => err ? next(err) : res.render('users/profile', data))
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
    const userId = req.user.id
    const userIdFromReqParams = req.params.id
    const userName = req.body.name
    const imageFile = req.file
    userServices.putUser(userId, userIdFromReqParams, userName, imageFile, (err, data) =>
      err ? next(err) : res.redirect(`/users/${userIdFromReqParams}`))
  },
  getUsers: (req, res, next) => {
    userServices.getUsers((err, data) => err ? next(err) : res.render('admin/users', data))
  },
  patchUser: (req, res, next) => {
    const id = req.params.id
    userServices.patchUser(id, (err, data) => {
      if (err) return next(err)
      req.flash('success_messages', "User's privilege was successfully modified")
      req.session.updatedData = data
      return res.redirect('/admin/users')
    })
  }
}

module.exports = userController
