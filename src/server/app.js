'use strict'

/**
 * Import dependencies
 */
require('dotenv').config()
const express = require('express')
const app = express()
const config = require('config')
const compression = require('compression')
const helmet = require('helmet')
const featurePolicy = require('feature-policy')
const { Liquid } = require('liquidjs')
const engine = new Liquid()
const path = require('path')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const createError = require('http-errors')
const error = require('./middleware/error')
require('express-async-errors')
const mongoose = require('mongoose')
const favicon = require('serve-favicon')
const httpLogger = require('morgan')
const { log } = require('./modules/logger')
const debug = {
  startup: require('debug')('api:startup'),
  database: require('debug')('api:database')
}

const isProduction = app.get('env') === 'production'

/**
 * Error if missing jwtPrivateKey
 */
if(!config.get('jwtPrivateKey')) {
  log.error('FATAL ERROR: jwtPrivateKey is not defined.')
}

/**
 * Setup HTTP headers
 */

// CORS
const corsOptions = {
  // Access-Control-Allow-Origin
  origin: isProduction ? config.get('site.url') : '*',
}
app.use(cors(corsOptions))

// Helmet
const helmetHeaders = {
  contentSecurityPolicy: {
    directives: {
      defaultSrc: [
        "'self'"
        ],
      upgradeInsecureRequests: true
    }
  },
  frameguard: {
    action: 'deny'
  },
  hsts: {
    maxAge: isProduction ? 31536000 : 0, // 1 year
    includeSubDomains: isProduction ? true : null,
    preload: isProduction ? true : null
  },
  referrerPolicy: {
    policy: 'strict-origin-when-cross-origin'
  }
}
app.use(helmet(helmetHeaders)) // Set HTTP headers

/**
 * Set Feature Policy HTTP header.
 *
 * @since 1.3.1
 */
app.use(featurePolicy({
  features: {
    geolocation: ["'none'"],
    midi: ["'none'"],
    notifications: ["'none'"],
    push: ["'none'"],
    syncXhr: ["'self'"],
    microphone: ["'none'"],
    camera: ["'none'"],
    magnetometer: ["'none'"],
    gyroscope: ["'none'"],
    speaker: ["'none'"],
    vibrate: ["'none'"],
    fullscreen: ["'none'"],
    payment: ["'none'"]
  }
}))

/**
 * Setup gzip compression
 */
app.use(compression()) // compress all responses

/**
 * Serve favicon
 */
app.use(favicon(path.join(__dirname, './public/img/favicon', 'favicon.ico')))

/**
 * Setup logging
 */
if (!isProduction) {
  app.use(httpLogger('dev')) // Log requests to the console
}

/**
 * Connect to Database
 */
const dbString  = config.get('db.string')

mongoose.connect(dbString, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
  .then(() => { debug.database('Connected to MongoDB...') })
  .catch((err) => { debug.database('Could not connect to MongoDB...', err) })

mongoose.connection.on('error', err => {
  log.error('Database error... ', err)
  debug.database('Database error... ', err)
})

/**
 * Setup view engine
 */
app.engine('liquid', engine.express()) 
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'liquid')


/**
 * Setup other middleware
 */
app.use(express.json()) // Return JSON
app.use(express.urlencoded({ extended: false })) // Allow query strings
app.use(cookieParser()) // Parse cookies
app.use(express.static(path.join(__dirname, 'public'))) // Serve static content

/**
 * Import routes
 */
const index = require('./routes/index')
const api = require('./routes/api')
const pledges = require('./routes/pledges')
const users = require('./routes/users')
const auth = require('./routes/auth')
const admin = require('./routes/admin')
const login = require('./routes/login')
const logout = require('./routes/logout')

/**
 * Setup routes
 */
app.use('/', index)
app.use('/api', api)
app.use('/api/pledges', pledges)
app.use('/api/users', users)
app.use('/api/auth', auth)
app.use('/admin', admin)
app.use('/login', login)
app.use('/logout', logout)

/**
 * Catch 404 and forward to error handler
 */
app.use(function(req, res, next) {
  next(createError(404))
})
app.use(error)

module.exports = app
