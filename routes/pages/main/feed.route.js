const router = require('express').Router()

/* eslint-disable */
const feedController = requireWrapper('controllers/pages/main/feed.controller')
/* eslint-enable */

router.get('/objectives&comments', feedController.getObjectivesAndComments)

module.exports = router
