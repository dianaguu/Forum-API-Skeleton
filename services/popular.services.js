/* eslint-disable */
const { Objective, Category, Comment, User } = requireWrapper('models')
/* eslint-enable */

const MN_MAX_CHARACTERS = 50

const popularServices = {
  getObjectives: async (reqUser, recordsLimit, callback) => {
    try {
      const objectives = await Objective.findAll({
        include: [{
          model: User,
          attributes: ['id', 'name'],
          as: 'FavoriteUsers',
          through: { attributes: [] }
        }]
      })
      const preprocessedObjectives = await objectives.map((objective) => ({
        ...objective.toJSON(),
        description: objective.description.substring(0, MN_MAX_CHARACTERS),
        favoriteUsersCount: objective.FavoriteUsers.length,
        isFavorite: reqUser.FavoriteObjectives.map(favoriteObjectives =>
          favoriteObjectives.id).includes(objective.id)
      }))
        .sort((a, b) => b.favoriteUsersCount - a.favoriteUsersCount)
        .slice(0, Number(recordsLimit))
      callback(null, { objectives: preprocessedObjectives })
    } catch (err) {
      callback(err)
    }
  },
  getFollowings: async (reqUser, recordsLimit, callback) => {
    try {
      const users = await User.findAll({
        attributes: { exclude: ['password'] },
        include: [{
          model: User,
          attributes: ['id', 'name'],
          as: 'Followers',
          through: { attributes: [] }
        }]
      })

      const preprocessedUser = users?.map(user => ({
        ...user.toJSON(),
        followersCount: user.Followers.length,
        isFollow: reqUser.Followings.some(following => following.id === user.id)
      }))
        .sort((a, b) => b.followersCount - a.followersCount)
        .slice(0, Number(recordsLimit))
      callback(null, { users: preprocessedUser })
    } catch (err) {
      callback(err)
    }
  }
}

module.exports = popularServices
