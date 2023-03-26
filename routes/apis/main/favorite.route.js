const router = require('express').Router()

// eslint-disable-next-line
const favoriteController = requireWrapper('controllers/apis/main/favorite.controller')

router.post('/:id/add', favoriteController.addFavorite)
router.delete('/:id/remove', favoriteController.removeFavorite)

module.exports = router
