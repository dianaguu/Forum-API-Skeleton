const router = require('express').Router()

/* eslint-disable */
const objectiveController = requireWrapper('controllers/pages/admin/objective.controller')
const upload = requireWrapper('middlewares/multer')
/* eslint-enable */

router.get('/create', objectiveController.createFormObjective)
router.get('/:id/edit', objectiveController.editFormObjective)
router.put('/:id', upload.single('image'), objectiveController.putObjective)
router.delete('/:id', objectiveController.deleteObjective)
router.get('/:id', objectiveController.getObjective)
router.post('/', upload.single('image'), objectiveController.postObjective)
router.get('/', objectiveController.getObjectives)

module.exports = router
