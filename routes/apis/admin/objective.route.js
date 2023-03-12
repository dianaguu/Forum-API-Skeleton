const router = require('express').Router()

// eslint-disable-next-line
const objectiveController = requireWrapper('controllers/apis/admin/objective.controller')

router.post('/create', objectiveController.postObjective)
router.put('/:id/edit', objectiveController.putObjective)
router.delete('/:id/delete', objectiveController.deleteObjective)
router.get('/:id', objectiveController.getObjective)
router.get('/', objectiveController.getObjectives)

module.exports = router
