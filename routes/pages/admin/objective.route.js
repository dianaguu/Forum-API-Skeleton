const router = require('express').Router()

/* eslint-disable */
const objectiveController = requireWrapper('controllers/pages/admin/objective.controller')
const upload = requireWrapper('middlewares/multer')
/* eslint-enable */

router.post('/create', upload.single('image'), objectiveController.postObjective)
router.get('/create', objectiveController.createObjective)
router.put('/:id/edit', upload.single('image'), objectiveController.putObjective)
router.get('/:id/edit', objectiveController.editObjective)
router.delete('/:id/delete', objectiveController.deleteObjective)
router.get('/:id', objectiveController.getObjective)
router.get('/', objectiveController.getObjectives)

module.exports = router
