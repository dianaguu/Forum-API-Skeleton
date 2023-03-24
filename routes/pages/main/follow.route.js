const router = require('express').Router()

// eslint-disable-next-line
const followController = requireWrapper('controllers/pages/main/follow.controller')

router.get('/topTen', followController.getTopTen)
router.post('/:id/add', followController.addFollow)
router.delete('/:id/remove', followController.removeFollow)

module.exports = router
