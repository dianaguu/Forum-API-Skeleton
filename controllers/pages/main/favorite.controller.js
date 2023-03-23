/* eslint-disable */
const favoriteServices = requireWrapper('services/favorite.services')
/* eslint-enable */

const favoriteController = {
  addFavorite: (req, res, next) => {
    const objectiveId = req.params.id
    const userId = req.user.id
    favoriteServices.addFavorite(objectiveId, userId, (err, data) => {
      if (err) return next(err)
      req.session.addedData = data
      return res.redirect('back')
    })
  },
  removeFavorite: (req, res, next) => {
    const objectiveId = req.params.id
    const userId = req.user.id
    favoriteServices.removeFavorite(objectiveId, userId, (err, data) => {
      if (err) return next(err)
      req.session.removedData = data
      return res.redirect('back')
    })
  }
}

module.exports = favoriteController
