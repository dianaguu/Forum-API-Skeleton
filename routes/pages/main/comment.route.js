const router = require('express').Router()

// eslint-disable-next-line
const commentController = requireWrapper('controllers/pages/main/comment.controller')

router.delete('/:id', commentController.deleteComment)
router.post('/', commentController.postComment)

module.exports = router
