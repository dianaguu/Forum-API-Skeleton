const router = require('express').Router()

// eslint-disable-next-line
const objectiveController = requireWrapper('controllers/pages/main/objective.controller')

router.get('/', objectiveController.getObjectivesWithCategoryIdAndPagination)

module.exports = router
