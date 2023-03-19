const router = require('express').Router()

/* eslint-disable */
const objectiveController = requireWrapper('controllers/apis/main/objective.controller')
/* eslint-enable */

router.get('', objectiveController.getObjectivesWithCategoryId)

module.exports = router
