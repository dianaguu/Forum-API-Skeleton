/* eslint-disable */
const feedServices = requireWrapper('services/feed.services')
/* eslint-enable */

const feedController = {
  getObjectivesAndComments: (req, res, next) => {
    feedServices.getObjectivesAndComments((err, data) => err ? next(err) : res.json({ status: 'success', data }))
  }
}

module.exports = feedController
