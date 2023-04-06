/* eslint-disable */
const { Objective, User, Comment } = requireWrapper('models')
const { imgurFileHandler } = requireWrapper('helpers/file.helper')
/* eslint-enable */

const userServices = {
  getUsers: (callback) => {
    User.findAll({
      raw: true,
      nest: true
    })
      .then(users => callback(null, { users }))
      .catch(err => callback(err))
  },
  getUser: async (reqUserId, reqParamsId, callback) => {
    try {
      let user = await User.findByPk(reqParamsId, {
        include: [
          { model: Comment, include: Objective },
          { model: Objective, as: 'FavoriteObjectives' },
          { model: User, as: 'Followers' },
          { model: User, as: 'Followings' }]
      })
      if (!user) throw new Error("User didn't exist!")

      user = user.toJSON()
      // CommentObjectives: remove duplicate objective
      user.CommentObjectives = user.Comments?.reduce((objectiveList, currentComment) => {
        if (!objectiveList.some(objective => objective.id === currentComment.objectiveId)) {
          objectiveList.push(currentComment.Objective)
        }
        return objectiveList
      }, [])
      if (user.id === reqUserId) user.isSignIn = true

      callback(null, { user })
    } catch (err) {
      callback(err)
    }
  },
  putUser: async (reqUserId, reqParamsId, reqBodyName, reqFile, callback) => {
    try {
      if (reqUserId !== Number(reqParamsId)) {
        const err = new Error('insufficient privilege')
        err.status = 403
        throw err
      }

      const [user, imageImgurLink] = await Promise.all([
        User.findByPk(reqParamsId),
        imgurFileHandler(reqFile)
      ])
      if (!user) throw new Error("User didn't exist!")
      const updatedUser = await user.update({
        name: reqBodyName,
        image: imageImgurLink || user.image
      })
      callback(null, { user: updatedUser.toJSON() })
    } catch (err) {
      callback(err)
    }
  },
  patchUser: async (reqParamsId, callback) => {
    try {
      const user = await User.findByPk(reqParamsId)
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
