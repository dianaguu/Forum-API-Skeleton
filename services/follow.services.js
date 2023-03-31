/* eslint-disable */
const { Followship, User } = requireWrapper('models')
/* eslint-enable */

const favoriteServices = {
  addFollow: async (reqUserId, reqParamsId, callback) => {
    try {
      const [user, followship] = await Promise.all([
        User.findByPk(reqParamsId),
        Followship.findOne({
          where: {
            followerId: reqUserId,
            followingId: reqParamsId
          }
        })
      ])
      if (!user) throw new Error("User didn't exist!")
      if (followship) throw new Error('You have already followed this user!')

      const addedFollow = await Followship.create({
        followerId: reqUserId,
        followingId: reqParamsId
      })
      callback(null, { followship: addedFollow, user })
    } catch (err) {
      callback(err)
    }
  },
  removeFollow: async (reqUserId, reqParamsId, callback) => {
    try {
      const followship = await Followship.findOne({
        where: {
          followerId: reqUserId,
          followingId: reqParamsId
        }
      })
      if (!followship) throw new Error("You haven't followed this user!")

      const deletedFollow = await followship.destroy()
      callback(null, { followship: deletedFollow })
    } catch (err) {
      callback(err)
    }
  }
}

module.exports = favoriteServices
