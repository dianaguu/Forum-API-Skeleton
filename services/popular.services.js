/* eslint-disable */
const { Objective, Category, Comment, User } = requireWrapper('models')
/* eslint-enable */

const MN_MAX_CHARACTERS = 50

const popularServices = {
  getObjectives: async (reqUserId, recordsLimit, callback) => {
    try {
      const [objectives, user] = await Promise.all([
        Objective.findAll({
          include: [{
            model: User,
            attributes: ['id', 'name'],
            as: 'FavoriteUsers',
            through: { attributes: [] }
          }]
        }),
        User.findByPk(reqUserId, {
          include: { model: Objective, attributes: ['id'], as: 'FavoriteObjectives' }
        })
      ])
      const preprocessedObjectives = await objectives.map((objective) => ({
        ...objective.toJSON(),
        description: objective.description.substring(0, MN_MAX_CHARACTERS),
        favoriteCount: objective.FavoriteUsers.length,
        isFavorite: user.FavoriteObjectives.map(favoriteObjectives =>
          favoriteObjectives.id).includes(objective.id)
      }))
        .sort((a, b) => b.favoriteCount - a.favoriteCount)
        .slice(0, Number(recordsLimit))
      callback(null, { objectives: preprocessedObjectives })
    } catch (err) {
      callback(err)
    }
  },
  getFollowings: async (reqUserId, recordsLimit, callback) => {
    try {
      const [users, user] = await Promise.all([
        User.findAll({
          attributes: { exclude: ['password'] },
          include: [{
            model: User,
            attributes: ['id', 'name'],
            as: 'Followers',
            through: { attributes: [] }
          }]
        }),
        User.findByPk(reqUserId, {
          include: { model: User, attributes: ['id'], as: 'Followings' }
        })
      ])

      const signInUser = user.toJSON()
      const sortedUser = users?.map(user => ({
        ...user.toJSON(),
        followerCount: user.Followers.length,
        isFollow: signInUser.Followings.some(following => following.id === user.id)
      }))
        .sort((a, b) => b.followerCount - a.followerCount)
        .slice(0, Number(recordsLimit))
      callback(null, { users: sortedUser })
    } catch (err) {
      callback(err)
    }
  }
}

module.exports = popularServices
