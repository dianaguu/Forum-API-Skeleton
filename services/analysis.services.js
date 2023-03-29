const analysisServices = {
  preprocess: async (reqAnalysisData, reqQueryKey, callback) => {
    try {
      let data = ''
      switch (reqQueryKey) {
        case 'comments':
          data = {
            count: Object.keys(reqAnalysisData.user.Comments).length,
            comments: reqAnalysisData.user.Comments.map(comment => comment.text),
            'comments detail': reqAnalysisData.user.Comments
          }
          break
        case 'commented-objectives':
          data = {
            count: Object.keys(reqAnalysisData.user.CommentObjectives).length,
            'objectives name': reqAnalysisData.user.CommentObjectives.map(objective => objective.name),
            'commented objectives detail': reqAnalysisData.user.CommentObjectives
          }
          break
        case 'favorited-objectives':
          data = {
            count: Object.keys(reqAnalysisData.user.FavoriteObjectives).length,
            'objectives name': reqAnalysisData.user.FavoriteObjectives.map(objective => objective.name),
            'favorited objectives detail': reqAnalysisData.user.FavoriteObjectives
          }
          break
        case 'followers':
          data = {
            count: Object.keys(reqAnalysisData.user.Followers).length,
            'followers name': reqAnalysisData.user.Followers.map(follower => follower.name),
            'followers detail': reqAnalysisData.user.Followers
          }
          break
        case 'followings':
          data = {
            count: Object.keys(reqAnalysisData.user.Followings).length,
            'followings name': reqAnalysisData.user.Followings.map(following => following.name),
            'followings detail': reqAnalysisData.user.Followings
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
