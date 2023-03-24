/* eslint-disable */
const { Followship, User } = requireWrapper('models')
/* eslint-enable */

const favoriteServices = {
  getTopTen: async (userFollowings, callback) => {
    try {
      const users = await User.findAll({
        include: { model: User, as: 'Followers' }
      })
      const sortedUser = users.map(user => ({
        ...user.toJSON(),
        followerCount: user.Followers.length,
        isFollow: userFollowings.some(following => following.id === user.id)

      }))
        .sort((a, b) => b.followerCount - a.followerCount)
      callback(null, { users: sortedUser })
    } catch (err) {
      callback(err)
    }
  },
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
      callback(null, { followship: addedFollow })
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
