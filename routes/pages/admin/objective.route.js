const router = require('express').Router()

// eslint-disable-next-line
const adminController = requireWrapper('controllers/pages/admin/objective.controller')

router.get('/', adminController.getObjectives)

module.exports = router
