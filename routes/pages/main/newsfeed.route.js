const router = require('express').Router()

/* eslint-disable */
const newsfeedController = requireWrapper('controllers/pages/main/newsfeed.controller')
/* eslint-enable */

router.get('/objectives&comments', newsfeedController.getObjectivesAndComments)

module.exports = router
