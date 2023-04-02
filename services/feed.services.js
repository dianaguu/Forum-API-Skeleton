/* eslint-disable */
const { Objective, Category, Comment, User } = requireWrapper('models')
/* eslint-enable */

const feedServices = {
  getObjectives: (recordsLimit, callback) => {
    Objective.findAll({
      limit: Number(recordsLimit),
      order: [['createdAt', 'DESC']],
      include: [{ model: Category, attributes: ['id', 'name'] }],
      raw: true,
      nest: true
    })
      .then(objectives => callback(null, { objectives }))
      .catch(err => callback(err))
  },
  getComments: async (recordsLimit, callback) => {
    Comment.findAll({
      limit: Number(recordsLimit),
      order: [['createdAt', 'DESC']],
      include: [{ model: User, attributes: ['id', 'name'] },
        { model: Objective, attributes: ['id', 'name'] }],
      raw: true,
      nest: true
    })
      .then(comments => callback(null, { comments }))
      .catch(err => callback(err))
  }
}

module.exports = feedServices
