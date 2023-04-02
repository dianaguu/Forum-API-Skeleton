/* eslint-disable */
const { Objective, Category, Comment, User } = requireWrapper('models')
/* eslint-enable */

const feedServices = {
  getObjectivesAndComments: async (callback) => {
    try {
      const [objectives, comments] = await Promise.all([
        Objective.findAll({
          limit: 10,
          order: [['createdAt', 'DESC']],
          include: [Category],
          raw: true,
          nest: true
        }),
        Comment.findAll({
          limit: 10,
          order: [['createdAt', 'DESC']],
          include: [User, Objective],
          raw: true,
          nest: true
        })
      ])
      callback(null, { objectives, comments })
    } catch (err) {
      callback(err)
    }
  }
}

module.exports = feedServices
