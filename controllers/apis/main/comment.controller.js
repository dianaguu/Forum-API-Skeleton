/* eslint-disable */
const commentServices = requireWrapper('services/comment.services')
/* eslint-enable */

const commentController = {
  postComment: (req, res, next) => {
    const { text, objectiveId } = req.body
    const userId = req.user.id
    commentServices.postComment(text, objectiveId, userId, (err, data) => err ? next(err) : res.json({ status: 'success', data }))
  },
  deleteComment: (req, res, next) => {
    const commentId = req.params.id
    const userIsAdmin = req.user.isAdmin
    commentServices.deleteComment(commentId, userIsAdmin, (err, data) => err ? next(err) : res.json({ status: 'success', data }))
  }
}

module.exports = commentController
