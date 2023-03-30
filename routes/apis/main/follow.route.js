const router = require('express').Router()

// eslint-disable-next-line
const followController = requireWrapper('controllers/apis/main/follow.controller')

router.post('/:id', followController.addFollow)
router.delete('/:id', followController.removeFollow)

module.exports = router
