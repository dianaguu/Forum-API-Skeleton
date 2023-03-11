const router = require('express').Router()

// eslint-disable-next-line
const objectiveController = requireWrapper('controllers/apis/admin/objective.controller')

router.put('/:id/update', objectiveController.putObjective)
router.post('/create', objectiveController.postObjective)
router.get('/', objectiveController.getObjectives)

module.exports = router
