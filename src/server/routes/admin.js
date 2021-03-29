const router = require('express').Router()
const auth = require('../middleware/auth')
const admin = require('../middleware/admin')
const handlers = require('../handlers/admin')
const rateLimit = require('express-rate-limit')

const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 60 // 60 requests
})

router.get('/', [auth, admin, limiter], handlers.showDashboard)

module.exports = router
