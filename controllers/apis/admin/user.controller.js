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
  getUser: (req, res, next) => {
    const reqUserId = req.user.id
    const reqParamsId = req.params.id
    userServices.getUser(reqUserId, reqParamsId, (err, data) => err ? next(err) : res.json({ status: 'success', data }))
  },
  patchUser: (req, res, next) => {
    const reqParamsId = req.params.id
    userServices.patchUser(reqParamsId, (err, data) => err ? next(err) : res.json({ status: 'success', data }))
  }
}

module.exports = userController
