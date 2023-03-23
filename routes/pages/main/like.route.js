const router = require('express').Router()

// eslint-disable-next-line
const likeController = requireWrapper('controllers/pages/main/like.controller')

router.post('/:id/add', likeController.addLike)
router.delete('/:id/remove', likeController.removeLike)

module.exports = router
