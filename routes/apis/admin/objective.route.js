const router = require('express').Router()

/* eslint-disable */
const objectiveController = requireWrapper('controllers/apis/admin/objective.controller')
const upload = requireWrapper('middlewares/multer')
/* eslint-enable */

router.post('/', upload.single('image'), objectiveController.postObjective)
router.put('/:id', upload.single('image'), objectiveController.putObjective)
router.delete('/:id', objectiveController.deleteObjective)
router.get('/:id', objectiveController.getObjective)
router.get('/', objectiveController.getObjectives)

module.exports = router
