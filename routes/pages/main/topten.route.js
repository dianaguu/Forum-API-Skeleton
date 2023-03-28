const router = require('express').Router()

/* eslint-disable */
const toptenController = requireWrapper('controllers/pages/main/topten.controller')
/* eslint-enable */

router.get('/objectives', toptenController.getObjectives)
router.get('/followings', toptenController.getFollowings)

module.exports = router
