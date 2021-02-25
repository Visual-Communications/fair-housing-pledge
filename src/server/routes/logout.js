const router = require('express').Router()
const handlers = require('../handlers/logout')
const rateLimit = require('express-rate-limit')

const strictLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 10 // 10 requests
})

router.get('/', strictLimiter, handlers.handleLogout)

module.exports = router