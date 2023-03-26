/* eslint-disable */
const favoriteServices = requireWrapper('services/favorite.services')
/* eslint-enable */

const favoriteController = {
  addFavorite: (req, res, next) => {
    const objectiveId = req.params.id
    const userId = req.user.id
    favoriteServices.addFavorite(objectiveId, userId, (err, data) => err ? next(err) : res.json({ status: 'success', data }))
  },
  removeFavorite: (req, res, next) => {
    const objectiveId = req.params.id
    const userId = req.user.id
    favoriteServices.removeFavorite(objectiveId, userId, (err, data) => err ? next(err) : res.json({ status: 'success', data }))
  }
}

module.exports = favoriteController
