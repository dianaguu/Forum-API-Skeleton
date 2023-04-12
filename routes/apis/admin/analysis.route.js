const router = require('express').Router()

/* eslint-disable */
const analysisController = requireWrapper('controllers/apis/admin/analysis.controller')
const userController = requireWrapper('controllers/apis/main/user.controller')
const objectiveController = requireWrapper('controllers/apis/main/objective.controller')
/* eslint-enable */

router.get('/user/:id', userController.getUser, analysisController.preprocess)
router.get('/objective/:id', objectiveController.getObjectiveWithDetail, analysisController.preprocess)

module.exports = router
