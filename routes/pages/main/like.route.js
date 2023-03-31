const router = require('express').Router()

// eslint-disable-next-line
const likeController = requireWrapper('controllers/pages/main/like.controller')

router.post('/:id', likeController.addLike)
router.delete('/:id', likeController.removeLike)

module.exports = router
