/* eslint-disable */
const { Objective, User, Comment } = requireWrapper('models')
const { imgurFileHandler } = requireWrapper('helpers/file.helper')
/* eslint-enable */

const userServices = {
  getUser: async (id, callback) => {
    try {
      let user = await User.findByPk(id, {
        include: [
          { model: Comment, include: Objective },
          { model: Objective, as: 'FavoriteObjectives' }]
      })
      if (!user) throw new Error("User didn't exist!")

      user = user.toJSON()
      user.CommentObjectives = user.Comments?.reduce((objectiveList, currentComment) => {
        if (!objectiveList.some(objective => objective.id === currentComment.objectiveId)) {
          objectiveList.push(currentComment.Objective)
        }
        return objectiveList
      }, [])
      callback(null, { user })
    } catch (err) {
      callback(err)
    }
  },
  putUser: async (userId, userIdFromReqParams, userName, imageFile, callback) => {
    try {
      if (Number(userId) !== Number(userIdFromReqParams)) {
        callback(null, null)
      }

      const [user, imageImgurLink] = await Promise.all([
        User.findByPk(userIdFromReqParams),
        imgurFileHandler(imageFile)
      ])
      if (!user) throw new Error("User didn't exist!")
      const updatedUser = await user.update({
        name: userName,
        image: imageImgurLink || user.image
      })
      callback(null, { user: updatedUser.toJSON() })
    } catch (err) {
      callback(err)
    }
  },
  getUsers: (callback) => {
    User.findAll({
      raw: true,
      nest: true
    })
      .then(users => callback(null, { users }))
      .catch(err => callback(err))
  },
  patchUser: async (id, callback) => {
    try {
      const user = await User.findByPk(id)
      if (!user) throw new Error("User didn't exist!")
      if (user.email === 'root@example.com') {
        const err = new Error("Didn't allow to modify root's privilege")
        err.status = 403
        throw err
      }

      const updatedUser = await user.update({ isAdmin: !user.isAdmin })
      callback(null, { user: updatedUser })
    } catch (err) {
      callback(err)
    }
  }
}

module.exports = userServices
