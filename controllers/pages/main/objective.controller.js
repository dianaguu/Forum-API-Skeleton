/* eslint-disable */
const objectiveServices = requireWrapper('services/objective.services')
/* eslint-enable */

const objectiveController = {
  getObjectivesWithCategoryId: (req, res, next) => {
    const categoryId = Number(req.query.categoryId) || ''
    objectiveServices.getObjectivesWithCategoryId(categoryId, (err, data) => err ? next(err) : res.render('objectives', data))
  }
}

module.exports = objectiveController
