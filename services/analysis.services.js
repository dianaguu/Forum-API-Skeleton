const analysisServices = {
  preprocess: async (reqAnalysisData, reqQueryKey, callback) => {
    try {
      let data = ''
      switch (reqQueryKey) {
        case 'comments':
          data = {
            count: Object.keys(reqAnalysisData.Comments).length,
            comments: reqAnalysisData.Comments.map(comment => comment.text),
            'comments detail': reqAnalysisData.Comments
          }
          break
        case 'commented-objectives':
          data = {
            count: Object.keys(reqAnalysisData.CommentObjectives).length,
            'objectives name': reqAnalysisData.CommentObjectives.map(objective => objective.name),
            'commented objectives detail': reqAnalysisData.CommentObjectives
          }
          break
        case 'favorited-objectives':
          data = {
            count: Object.keys(reqAnalysisData.FavoriteObjectives).length,
            'objectives name': reqAnalysisData.FavoriteObjectives.map(objective => objective.name),
            'favorited objectives detail': reqAnalysisData.FavoriteObjectives
          }
          break
        case 'followers':
          data = {
            count: Object.keys(reqAnalysisData.Followers).length,
            'followers name': reqAnalysisData.Followers.map(follower => follower.name),
            'followers detail': reqAnalysisData.Followers
          }
          break
        case 'followings':
          data = {
            count: Object.keys(reqAnalysisData.Followings).length,
            'followings name': reqAnalysisData.Followings.map(following => following.name),
            'followings detail': reqAnalysisData.Followings
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
