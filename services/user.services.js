/* eslint-disable */
const { Objective, User, Comment } = requireWrapper('models')
const { imgurFileHandler } = requireWrapper('helpers/file.helper')
/* eslint-enable */

const userServices = {
  getUsers: (callback) => {
    User.findAll({
      attributes: { exclude: ['password'] },
      raw: true,
      nest: true
    })
      .then(users => callback(null, { users }))
      .catch(err => callback(err))
  },
  getUser: async (reqUserId, reqParamsId, attributes, callback) => {
    try {
      let user = await User.findByPk(reqParamsId, {
        attributes: { exclude: ['password'] },
        include: [
          { model: Objective, attributes, as: 'FavoriteObjectives', through: { attributes: [] } },
          { model: User, attributes, as: 'Followers', through: { attributes: [] } },
          { model: User, attributes, as: 'Followings', through: { attributes: [] } },
          { model: Comment, attributes: { exclude: ['userId'] }, include: { model: Objective, attributes } }]
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
      callback(null, { user: updatedUser.toJSON() })
    } catch (err) {
      callback(err)
    }
  }
}

module.exports = userServices
