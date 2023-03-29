const router = require('express').Router()

/* eslint-disable */
const analysisController = requireWrapper('controllers/apis/main/analysis.controller')
const userController = requireWrapper('controllers/apis/main/user.controller')
const objectiveController = requireWrapper('controllers/apis/main/objective.controller')
/* eslint-enable */

router.get('/user/:id', userController.getUser, analysisController.preprocess)
router.get('/objective/:id', objectiveController.getObjectiveWithComments, analysisController.preprocess)

module.exports = router
