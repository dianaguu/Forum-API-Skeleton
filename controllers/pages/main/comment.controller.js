/* eslint-disable */
const commentServices = requireWrapper('services/comment.services')
/* eslint-enable */

const commentController = {
  postComment: (req, res, next) => {
    const { text, objectiveId } = req.body
    const userId = req.user.id
    commentServices.postComment(text, objectiveId, userId, (err, data) => {
      if (err) return next(err)
      req.session.createdData = data
      return res.redirect(`/forum/objectives/${objectiveId}`)
    })
  },
  deleteComment: (req, res, next) => {
    const commentId = req.params.id
    const userIsAdmin = req.user.isAdmin
    commentServices.deleteComment(commentId, userIsAdmin, (err, data) => {
      if (err) return next(err)
      req.session.deletedData = data
      return res.redirect(`/forum/objectives/${data.comment.objectiveId}`)
    })
  }
}

module.exports = commentController
