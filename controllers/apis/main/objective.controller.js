/* eslint-disable */
const objectiveServices = requireWrapper('services/objective.services')
/* eslint-enable */

const objectiveController = {
  getObjectivesWithCategoryId: (req, res, next) => {
    const categoryId = Number(req.query.categoryId) || ''
    objectiveServices.getObjectivesWithCategoryId(categoryId, (err, data) => {
      if (err) return next(err)
      return res.json({
        status: 'success',
        data: { count: Object.keys(data.objectives).length, objectives: data.objectives }
      })
    })
  }
}

module.exports = objectiveController
