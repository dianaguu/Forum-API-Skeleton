/* eslint-disable */
const newsFeedServices = requireWrapper('services/newsfeed.services')
/* eslint-enable */

const newsFeedController = {
  getObjectivesAndComments: (req, res, next) => {
    newsFeedServices.getObjectivesAndComments((err, data) => err ? next(err) : res.render('news-feed', data))
  }
}

module.exports = newsFeedController
