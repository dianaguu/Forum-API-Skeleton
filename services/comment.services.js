/* eslint-disable */
const { Comment, Objective, User } = requireWrapper('models')
/* eslint-enable */

const commentServices = {
  postComment: async (text, objectiveId, userId, callback) => {
    try {
      if (!text) throw new Error('Comment text is required!')

      const [objective, user] = await Promise.all([
        Objective.findByPk(objectiveId),
        User.findByPk(userId)
      ])
      if (!objective) throw new Error("Objective didn't exist!")
      if (!user) throw new Error("User didn't exist!")

      const comment = await Comment.create({
        text,
        objectiveId,
        userId
      })
      callback(null, { comment })
    } catch (err) {
      callback(err)
    }
  },
  deleteComment: (commentId, userIsAdmin, callback) => {
    if (!userIsAdmin) {
      const err = new Error('insufficient privilege')
      err.status = 403
      throw err
    }

    return Comment.findByPk(commentId)
      .then(comment => {
        if (!comment) throw new Error("Comment didn't exist!")
        return comment.destroy()
      })
      .then(deletedComment => callback(null, { comment: deletedComment.toJSON() }))
      .catch(err => callback(err))
  }
}

module.exports = commentServices
