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
      return res.redirect(`/objectives/${objectiveId}`)
    })
  },
  deleteComment: (req, res, next) => {
    const id = req.params.id
    commentServices.deleteComment(id, (err, data) => {
      if (err) return next(err)
      req.session.deletedData = data
      return res.redirect(`/objectives/${data.comment.objectiveId}`)
    })
  }
}

module.exports = commentController
