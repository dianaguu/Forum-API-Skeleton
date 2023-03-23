/* eslint-disable */
const likeServices = requireWrapper('services/like.services')
/* eslint-enable */

const favoriteController = {
  addLike: (req, res, next) => {
    const objectiveId = req.params.id
    const userId = req.user.id
    likeServices.addLike(objectiveId, userId, (err, data) => {
      if (err) return next(err)
      req.session.addedData = data
      return res.redirect('back')
    })
  },
  removeLike: (req, res, next) => {
    const objectiveId = req.params.id
    const userId = req.user.id
    likeServices.removeLike(objectiveId, userId, (err, data) => {
      if (err) return next(err)
      req.session.removedData = data
      return res.redirect('back')
    })
  }
}

module.exports = favoriteController
