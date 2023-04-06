const router = require('express').Router()

// eslint-disable-next-line
const objectiveController = requireWrapper('controllers/pages/main/objective.controller')

router.get('/:id/dashboard', objectiveController.getDashboard)
router.get('/:id', objectiveController.getObjectiveWithComments)
router.get('/', objectiveController.getObjectivesWithCategoryIdAndPagination)

module.exports = router
