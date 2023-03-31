const router = require('express').Router()

// eslint-disable-next-line
const favoriteController = requireWrapper('controllers/pages/main/favorite.controller')

router.post('/:id', favoriteController.addFavorite)
router.delete('/:id', favoriteController.removeFavorite)

module.exports = router
