const router = require('express').Router()

/* eslint-disable */
const popularController = requireWrapper('controllers/pages/main/popular.controller')
/* eslint-enable */

router.get('/objectives', popularController.getObjectives)
router.get('/followings', popularController.getFollowings)

module.exports = router
