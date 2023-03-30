const router = require('express').Router()

// eslint-disable-next-line
const commentController = requireWrapper('controllers/apis/main/comment.controller')

router.post('/', commentController.postComment)
router.delete('/:id', commentController.deleteComment)

module.exports = router
