/* eslint-disable */
const { Objective, Category, Comment, User } = requireWrapper('models')
/* eslint-enable */

const topTenServices = {
  getObjectives: async (reqUserId, callback) => {
    try {
      const [objectives, user] = await Promise.all([
        Objective.findAll({ include: { model: User, as: 'FavoriteUsers' } }),
        User.findByPk(reqUserId, { include: { model: Objective, as: 'FavoriteObjectives' } })
      ])
      const preprocessedObjectives = await objectives.map((objective) => ({
        ...objective.toJSON(),
        description: objective.description.substring(0, 50),
        favoriteCount: objective.FavoriteUsers.length,
        isFavorite: user.FavoriteObjectives.map(favoriteObjectives =>
          favoriteObjectives.id).includes(objective.id)
      }))
        .sort((a, b) => b.favoriteCount - a.favoriteCount)
        .slice(0, 10)
      callback(null, { objectives: preprocessedObjectives })
    } catch (err) {
      callback(err)
    }
  },
  getFollowings: async (callback) => {
    try {
      const users = await User.findAll({
        include: [
          { model: User, as: 'Followers' },
          { model: User, as: 'Followings' }]
      })
      const sortedUser = users.map(user => ({
        ...user.toJSON(),
        followerCount: user.Followers.length,
        isFollow: user.Followings.some(following => following.id === user.id)

      }))
        .sort((a, b) => b.followerCount - a.followerCount)
      callback(null, { users: sortedUser })
    } catch (err) {
      callback(err)
    }
  }
}

module.exports = topTenServices
