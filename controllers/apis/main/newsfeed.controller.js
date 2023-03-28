/* eslint-disable */
const newsFeedServices = requireWrapper('services/newsfeed.services')
/* eslint-enable */

const newsFeedController = {
  getObjectivesAndComments: (req, res, next) => {
    newsFeedServices.getObjectivesAndComments((err, data) => err ? next(err) : res.json({ status: 'success', data }))
  }
}

module.exports = newsFeedController
