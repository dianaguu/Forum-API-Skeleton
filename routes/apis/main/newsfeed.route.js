const router = require('express').Router()

/* eslint-disable */
const newsFeedController = requireWrapper('controllers/apis/main/newsfeed.controller')
/* eslint-enable */

router.get('/objectives&comments', newsFeedController.getObjectivesAndComments)

module.exports = router
