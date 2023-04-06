/* eslint-disable */
const { User } = requireWrapper('models')
const userServices = requireWrapper('services/user.services')
/* eslint-enable */

const userController = {
  getUser: (req, res, next) => {
    const attributes = ['id', 'name', 'image']
    userServices.getUser(req.user.id, req.params.id, attributes, (err, data) => err ? next(err) : res.render('users/profile', data))
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
        req.session.updatedData = data
        res.redirect(`/forum/users/${req.params.id}`)
      })
  },
  editUser: (req, res, next) => {
    return User.findByPk(req.params.id)
      .then(user => {
        if (!user) throw new Error("User didn't exist!")
        res.render('users/user-edit-form', { user: user.toJSON() })
      })
      .catch(err => next(err))
  }
}

module.exports = userController
