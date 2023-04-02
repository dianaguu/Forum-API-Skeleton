/* eslint-disable */
const feedServices = requireWrapper('services/feed.services')
/* eslint-enable */

const MN_RECORDS_LIMIT = 10

const feedController = {
  getObjectivesAndComments: async (req, res, next) => {
    const [objectives, comments] = await Promise.all([
      new Promise((resolve) => feedServices.getObjectives(MN_RECORDS_LIMIT, (err, data) =>
        err ? next(err) : resolve(data.objectives))),
      new Promise((resolve) => feedServices.getComments(MN_RECORDS_LIMIT, (err, data) =>
        err ? next(err) : resolve(data.comments)))
    ])
    return res.render('feed', { objectives, comments })
  }
}

module.exports = feedController
