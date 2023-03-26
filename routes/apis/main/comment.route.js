const router = require('express').Router()

// eslint-disable-next-line
const commentController = requireWrapper('controllers/apis/main/comment.controller')

router.post('/create', commentController.postComment)
router.delete('/:id/delete', commentController.deleteComment)

module.exports = router
