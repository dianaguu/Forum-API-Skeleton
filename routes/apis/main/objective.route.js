const router = require('express').Router()

/* eslint-disable */
const objectiveController = requireWrapper('controllers/apis/main/objective.controller')
/* eslint-enable */

router.get('/:id/dashboard', objectiveController.getDashboard)
router.get('/:id', objectiveController.getObjectiveWithDetail)
router.get('/', objectiveController.getObjectivesWithPagination)

module.exports = router
