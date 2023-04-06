function deleteUserPassword (users) {
  users.forEach(user => {
    delete user.password
  })
}

const analysisServices = {
  preprocess: async (reqAnalysisData, reqQueryKey, callback) => {
    try {
      let data = ''
      switch (reqQueryKey) {
        case 'comments':
          data = {
            objectiveName: reqAnalysisData.name,
            comments: reqAnalysisData.Comments.map(comment => comment.text),
            count: Object.keys(reqAnalysisData.Comments).length,
            commentDetail: reqAnalysisData.Comments
          }
          break
        case 'commented-objectives':
          data = {
            userName: reqAnalysisData.name,
            objectivesName: reqAnalysisData.CommentObjectives.map(objective => objective.name),
            count: Object.keys(reqAnalysisData.CommentObjectives).length,
            commentedObjectivesDetail: reqAnalysisData.CommentObjectives
          }
          break
        case 'favorited-objectives':
          data = {
            userName: reqAnalysisData.name,
            objectivesName: reqAnalysisData.FavoriteObjectives.map(objective => objective.name),
            count: Object.keys(reqAnalysisData.FavoriteObjectives).length,
            favoritedObjectivesDetail: reqAnalysisData.FavoriteObjectives
          }
          break
        case 'followers':
          deleteUserPassword(reqAnalysisData.Followers)
          data = {
            userName: reqAnalysisData.name,
            followersName: reqAnalysisData.Followers.map(follower => follower.name),
            count: Object.keys(reqAnalysisData.Followers).length,
            followersDetail: reqAnalysisData.Followers
          }
          break
        case 'followings':
          deleteUserPassword(reqAnalysisData.Followings)
          data = {
            userName: reqAnalysisData.name,
            followingsName: reqAnalysisData.Followings.map(following => following.name),
            count: Object.keys(reqAnalysisData.Followings).length,
            followingsDetail: reqAnalysisData.Followings
          }
          break
      }
      callback(null, data)
    } catch (err) {
      callback(err)
    }
  }
}
module.exports = analysisServices
