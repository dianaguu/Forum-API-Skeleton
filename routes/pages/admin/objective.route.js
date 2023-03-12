const router = require('express').Router()

// eslint-disable-next-line
const objectiveController = requireWrapper('controllers/pages/admin/objective.controller')

router.post('/create', objectiveController.postObjective)
router.get('/create', objectiveController.createObjective)
router.put('/:id/edit', objectiveController.putObjective)
router.get('/:id/edit', objectiveController.editObjective)
router.delete('/:id/delete', objectiveController.deleteObjective)
router.get('/:id', objectiveController.getObjective)
router.get('/', objectiveController.getObjectives)

module.exports = router
