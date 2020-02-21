'use strict'

/**
 * Import dependencies
 */
const express = require('express')
const app = express()
const config = require('config')
const helmet = require('helmet')
const { Liquid } = require('liquidjs')
const engine = new Liquid()
const path = require('path')
const cookieParser = require('cookie-parser')
const createError = require('http-errors')
const error = require('./middleware/error')
require('express-async-errors')
const mongoose = require('mongoose')
const favicon = require('serve-favicon')
const httpLogger = require('morgan')
const { log } = require('./modules/logger')
const debug = {
  startup: require('debug')('fair-housing-pledge:startup'),
  database: require('debug')('fair-housing-pledge:database')
}
require('dotenv').config()

/**
 * Import routes
 */
const index = require('./routes/index')
const auth = require('./routes/auth')
const agents = require('./routes/agents')
const users = require('./routes/users')

/**
 * Error if missing jwtPrivateKey
 */
if(!config.get('jwtPrivateKey')) {
  log.error('FATAL ERROR: jwtPrivateKey is not defined.')
}

/**
 * Setup HTTP headers
 */
app.disable('x-powered-by')
app.use(helmet()) // Set HTTP headers

/**
 * Serve favicon
 */
app.use(favicon(path.join(__dirname, '../../build/client/img/favicon', 'favicon.ico')))

/**
 * Setup logging
 */
if (app.get('env') !== 'production') {
  app.use(httpLogger('dev')) // Log requests to the console
}

/**
 * Connect to Database
 */
const dbString = `mongodb://${config.db.host}/${config.db.database}`

mongoose.connect(dbString, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
  .then(() => { debug.database('Connected to MongoDB...') })
  .catch((err) => { debug.database('Could not connect to MongoDB...', err) })

mongoose.connection.on('error', err => {
  log.error('Database error...', err)
  debug.database('Database error...', err)
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
app.use(express.static(path.join(__dirname, '../../build/client'))) // Serve static content

/**
 * Setup routes
 */
app.use('/api', index)
app.use('/api/auth', auth)
app.use('/api/agents', agents)
app.use('/api/users', users)

/**
 * Catch 404 and forward to error handler
 */
app.use(function(req, res, next) {
  next(createError(404))
})

/**
 * Error middleware
 * TODO: Remove if unnecessary
 */
app.use(error)

/**
 * Error handler
 */
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

module.exports = app