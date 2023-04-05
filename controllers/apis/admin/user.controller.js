/* eslint-disable */
const userServices = requireWrapper('services/user.services')
/* eslint-enable */

const userController = {
  getUsers: (req, res, next) => {
    userServices.getUsers((err, data) => {
      if (err) return next(err)
      return res.json({
        status: 'success',
        data: {
          count: Object.keys(data.users).length,
          users: data.users
        }
      })
    })
  },
  getAdminUsers: (req, res, next) => {
    userServices.getUsers((err, data) => {
      if (err) return next(err)
      const adminUsers = data.users.reduce((adminList, currentUser) => {
        if (currentUser.isAdmin === Number(req.query.isAdmin)) {
          adminList.push(currentUser)
        }
        return adminList
      }, [])
      return res.json({
        status: 'success',
        data: {
          count: Object.keys(adminUsers).length,
          users: adminUsers
        }
      })
    })
  },
  patchUser: (req, res, next) => {
    userServices.patchUser(req.params.id, (err, data) => {
      if (err) return next(err)
      delete data.user.password
      res.json({ status: 'success', data })
    })
  }
}

module.exports = userController
