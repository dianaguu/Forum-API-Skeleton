/* eslint-disable */
const { Like, Objective, User } = requireWrapper('models')
/* eslint-enable */

const likeServices = {
  addLike: async (objectiveId, userId, callback) => {
    try {
      const [objective, like] = await Promise.all([
        Objective.findByPk(objectiveId),
        Like.findOne({ where: { objectiveId, userId } })
      ])
      if (!objective) throw new Error("Objective didn't exist!")
      if (like) throw new Error('You have already liked this objective!')

      const addedFavorite = await Like.create({
        objectiveId,
        userId
      })
      callback(null, { objective: addedFavorite })
    } catch (err) {
      callback(err)
    }
  },
  removeLike: async (objectiveId, userId, callback) => {
    try {
      const like = await Like.findOne({ where: { objectiveId, userId } })
      if (!like) throw new Error("You haven't liked this objective!")
      const deletedLike = await like.destroy()
      callback(null, { objective: deletedLike })
    } catch (err) {
      callback(err)
    }
  }
}

module.exports = likeServices
