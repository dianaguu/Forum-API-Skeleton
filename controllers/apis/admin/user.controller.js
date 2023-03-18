/* eslint-disable */
const { User } = requireWrapper('models')
const userServices = requireWrapper('services/user.services')
/* eslint-enable */

const categoryController = {
  getUsers: (req, res, next) => {
    userServices.getUsers((err, data) => err ? next(err) : res.json({ status: 'success', data }))
  },
  patchUser: (req, res, next) => {
    const id = req.params.id
    userServices.patchUser(id, (err, data) => err ? next(err) : res.json({ status: 'success', data }))
  }
}

module.exports = categoryController
