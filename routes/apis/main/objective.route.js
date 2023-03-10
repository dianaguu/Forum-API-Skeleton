const router = require('express').Router()

// eslint-disable-next-line
const objectiveController = requireWrapper('controllers/apis/main/objective.controller')

router.get('/', objectiveController.getObjectives)

module.exports = router
