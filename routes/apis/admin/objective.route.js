const router = require('express').Router()

/* eslint-disable */
const objectiveController = requireWrapper('controllers/apis/admin/objective.controller')
const upload = requireWrapper('middlewares/multer')
/* eslint-enable */

router.post('/create', upload.single('image'), objectiveController.postObjective)
router.put('/:id/edit', upload.single('image'), objectiveController.putObjective)
router.delete('/:id/delete', objectiveController.deleteObjective)
router.get('/:id', objectiveController.getObjective)
router.get('/', objectiveController.getObjectives)

module.exports = router
