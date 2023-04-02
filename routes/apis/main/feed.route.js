const router = require('express').Router()

/* eslint-disable */
const feedController = requireWrapper('controllers/apis/main/feed.controller')
/* eslint-enable */

router.get('/objectives', feedController.getObjectives)
router.get('/comments', feedController.getComments)

module.exports = router
