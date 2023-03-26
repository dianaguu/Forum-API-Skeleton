const router = require('express').Router()

/* eslint-disable */
const objectiveController = requireWrapper('controllers/apis/main/objective.controller')
/* eslint-enable */

router.get('/:id/dashboard', objectiveController.getDashboard)
router.get('/:id', objectiveController.getObjectiveWithComments)
router.get('/', objectiveController.getObjectives)

module.exports = router
