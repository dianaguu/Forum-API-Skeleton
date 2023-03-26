/* eslint-disable */
const likeServices = requireWrapper('services/like.services')
/* eslint-enable */

const favoriteController = {
  addLike: (req, res, next) => {
    const objectiveId = req.params.id
    const userId = req.user.id
    likeServices.addLike(objectiveId, userId, (err, data) => err ? next(err) : res.json({ status: 'success', data }))
  },
  removeLike: (req, res, next) => {
    const objectiveId = req.params.id
    const userId = req.user.id
    likeServices.removeLike(objectiveId, userId, (err, data) => err ? next(err) : res.json({ status: 'success', data }))
  }
}

module.exports = favoriteController
