/* eslint-disable */
const userServices = requireWrapper('services/user.services')
/* eslint-enable */

const categoryController = {
  getUsers: (req, res, next) => {
    userServices.getUsers((err, data) => err ? next(err) : res.render('admin/users', data))
  },
  patchUser: (req, res, next) => {
    userServices.patchUser(req.params.id, (err, data) => {
      if (err) return next(err)
      delete data.user.password
      req.flash('success_messages', "User's privilege was successfully modified")
      req.session.updatedData = data
      return res.redirect('/forum/admin/users')
    })
  }
}

module.exports = categoryController
