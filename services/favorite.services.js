/* eslint-disable */
const { Favorite, Objective, User } = requireWrapper('models')
/* eslint-enable */

const favoriteServices = {
  addFavorite: async (objectiveId, userId, callback) => {
    try {
      const [objective, favorite] = await Promise.all([
        Objective.findByPk(objectiveId),
        Favorite.findOne({ where: { objectiveId, userId } })
      ])
      if (!objective) throw new Error("Objective didn't exist!")
      if (favorite) throw new Error('You have already favorited this objective!')

      const addedFavorite = await Favorite.create({
        objectiveId,
        userId
      })
      callback(null, { objective: addedFavorite })
    } catch (err) {
      callback(err)
    }
  },
  removeFavorite: async (objectiveId, userId, callback) => {
    try {
      const favorite = await Favorite.findOne({ where: { objectiveId, userId } })
      if (!favorite) throw new Error("You haven't favorited this objective!")
      const deletedFavorite = await favorite.destroy()
      callback(null, { objective: deletedFavorite })
    } catch (err) {
      callback(err)
    }
  }
}

module.exports = favoriteServices
