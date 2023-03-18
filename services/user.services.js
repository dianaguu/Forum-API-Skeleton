/* eslint-disable */
const { User } = requireWrapper('models')
/* eslint-enable */

const userServices = {
  getUsers: (callback) => {
    User.findAll({
      raw: true,
      nest: true
    })
      .then(users => callback(null, { users }))
      .catch(err => callback(err))
  },
  patchUser: async (id, callback) => {
    try {
      const user = await User.findByPk(id)
      if (!user) throw new Error("User didn't exist!")
      if (user.email === 'root@example.com') {
        const err = new Error("Didn't allow to modify root's privilege")
        err.status = 403
        throw err
      }

      const updatedUser = await user.update({ isAdmin: !user.isAdmin })
      callback(null, { user: updatedUser })
    } catch (err) {
      callback(err)
    }
  }
}

module.exports = userServices
