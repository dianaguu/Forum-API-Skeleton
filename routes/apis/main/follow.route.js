const router = require('express').Router()

// eslint-disable-next-line
const followController = requireWrapper('controllers/apis/main/follow.controller')

router.post('/:id/add', followController.addFollow)
router.delete('/:id/remove', followController.removeFollow)

module.exports = router
