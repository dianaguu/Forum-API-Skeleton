const router = require('express').Router()

// eslint-disable-next-line
const objectiveController = requireWrapper('controllers/pages/admin/objective.controller')

router.get('/create', objectiveController.createObjective)
router.get('/:id/edit', objectiveController.editObjective)
router.get('/:id', objectiveController.getObjective)
router.put('/:id', objectiveController.putObjective)
router.get('/', objectiveController.getObjectives)
router.post('/', objectiveController.postObjective)

router.use('/', (req, res) => res.redirect('/admin/objectives'))

module.exports = router
