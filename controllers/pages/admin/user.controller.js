/* eslint-disable */
const userServices = requireWrapper('services/user.services')
/* eslint-enable */

const categoryController = {
  getUsers: (req, res, next) => {
    userServices.getUsers((err, data) => err ? next(err) : res.render('admin/users', data))
  },
  patchUser: (req, res, next) => {
    const reqParamsId = req.params.id
    userServices.patchUser(reqParamsId, (err, data) => {
      if (err) return next(err)
      req.flash('success_messages', "User's privilege was successfully modified")
      req.session.updatedData = data
      return res.redirect('/admin/users')
    })
  }
}

module.exports = categoryController
