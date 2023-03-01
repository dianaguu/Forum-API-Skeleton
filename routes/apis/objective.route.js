const router = require('express').Router()

// eslint-disable-next-line
const objectiveController = requireWrapper('controllers/apis/objective.controller')

router.get('/', objectiveController.getObjectives)

module.exports = router
