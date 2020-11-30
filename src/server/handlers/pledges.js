const config = require('config')
const { log } = require('../modules/logger')
const { Pledge, validate } = require('../models/pledge')
const _ = require('lodash')

module.exports = {
  /**
   * Get pledges
   */
  getPledges: async (req, res, options = {}) => {
    // Get pledges
    const pledges = await Pledge.find()

    // If no pledges exist, return 404 error to the client
    if (Array.isArray(pledges) && !pledges.length) {
      return res.status(404).send('no pledges found')
    }

    // Optionally sort pledges by query paramater
    const sortBy = req.query.sortBy
    if (sortBy) pledges.sort((a, b) => (a[sortBy] > b[sortBy]) ? 1 : -1)

    // Return pledges to the client
    return options.dashboard ? pledges : res.send(pledges)
  },

  /**
   * Create one or multiple pledges
   */
  createPledge: async (req, res) => {
    if (
      // If it's an array of pledge objects
      req.body.pledges &&
      Object.prototype.toString.call(req.body.pledges) === '[object Array]' &&
      req.body.pledges.length > 0
    ) {

      // Create pledges array
      let pledges = []

      req.body.pledges.forEach(async function (p) {
        // Validate pledge
        const { error } = validate.create(p)
        if (error) return res.status(400).send(error.details[0].message)

        // Don't save duplicate emails
        const duplicate = await Pledge.findOne({
          email: p.email
        })

        if (!duplicate) {
          // Add pledge to array
          this.push(_.pick(p, ['firstName', 'lastName', 'email', 'state', 'brand', 'company', 'event', 'agreeToTerms', 'courseCompleted']))
        }
      }, pledges)

      // Add pledges to the database
      pledges = await Pledge.insertMany(pledges)
      log.info(`${pledges.length} pledges created.`, _.pick(pledges, ['_doc', 'level', 'message', 'timestamp']))

      // Return redirect to the client
      return res.redirect(config.get('site.url') + '/course-certificate/')

    }

    // Validate pledge
    const { error } = validate.create(req.body)
    if (error) return res.status(400).send(error.details[0].message)

    // Create pledge
    let pledge = new Pledge(_.pick(req.body, ['firstName', 'lastName', 'email', 'state', 'brand', 'company', 'event', 'agreeToTerms', 'courseCompleted']))

    // Don't save duplicate emails
    const duplicate = await Pledge.findOne({
      email: pledge.email
    })

    if (!duplicate) {
      // Add pledge to the database
      pledge = await pledge.save()
      log.info('Pledge created.', _.pick(pledge, ['_doc', 'level', 'message', 'timestamp']))
    }

    // Return redirect to the client
    // return res.redirect('http://localhost:8082/course-certificate/')
    return res.redirect('https://fairhousingpledge.com/course-certificate/')

  },

  /**
   * Get a pledge
   */
  getPledge: async (req, res) => {
    // Get pledge
    const pledge = await Pledge.findOne({
      _id: req.params.id
    })

    // If pledge does not exist, 404 error
    if (!pledge) res.status(404).send('"id" was not found')

    // Return pledge to the client
    res.send(pledge)
  },

  /**
   * Update a pledge
   */
  updatePledge: async (req, res) => {
    // Validate pledge
    const { error } = validate.update(req.body)
    if (error) {
      return res.status(400).send(error.details[0].message)
    }

    // Update pledge in database with request body keys if they exist
    const requestBody = {}
    if (req.body.firstName) requestBody.firstName = req.body.firstName
    if (req.body.lastName) requestBody.lastName = req.body.lastName
    if (req.body.email) requestBody.email = req.body.email
    if (req.body.state) requestBody.state = req.body.state
    if (req.body.brand) requestBody.brand = req.body.brand
    if (req.body.company) requestBody.company = req.body.company
    if (req.body.event) requestBody.event = req.body.event
    if (req.body.courseCompleted) requestBody.courseCompleted = req.body.courseCompleted

    // Update the pledge in the database, and get the updated pledge
    const pledge = await Pledge.findByIdAndUpdate(req.params.id, requestBody, { new: true })

    // If pledge does not exist, return 404 error to the client
    if (!pledge) res.status(404).send('"id" was not found')

    log.info('Pledge updated.', _.pick(pledge, ['_doc', 'level', 'message', 'timestamp']))

    // Return updated pledge to client
    res.send(pledge)
  },

  /**
   * Update multiple pledges
   */
  updatePledges: async (req, res) => {
    // Validate request.
    const { error } = validate.updateMany(req.body)
    if (error) {
      return res.status(400).send(error.details[0].message)
    }

    // Update pledges in the database and get updated pledges.
    const pledges = await Pledge.updateMany(req.body.from, req.body.to)

    // If no matches are found, return 404 error to the client.
    if (0 === pledges.n) res.status(404).send('no matches found')

    // Log message to the server.
    log.info(`${pledges.nModified} pledges updated.`, _.pick(pledges, ['_doc', 'level', 'message', 'timestamp']))

    // Return message to the client.
    res.send(`${pledges.nModified} pledges updated.`)
  },

  /**
   * Delete a pledge
   */
  deletePledge: async (req, res) => {
    // Remove pledge from database, if it exists
    const pledge = await Pledge.findByIdAndRemove(req.params.id)

    // If pledge does not exist, return 404 error to the client
    if (!pledge) res.status(404).send('"id" was not found')

    log.info('Pledge removed.', _.pick(pledge, ['_doc', 'level', 'message', 'timestamp']))

    // Return deleted pledge to client
    res.send(pledge)
  },

  /**
   * Delete pledges.
   *
   * @since 1.3.0
   */
  deletePledges: async (req, res) => {
    // If no pledges requested, return 404 error to the client
    if (!req.body.pledges) res.status(404).send('"pledges" was not found')

    // Validate pledges
    const { error } = validate.delete(req.body)
    if (error) return res.status(400).send(error.details[0].message)

    // Remove pledges from database if they exist
    const pledges = await Pledge.deleteMany({ _id: { $in: req.body.pledges } })

    // If all pledges do not exist in the database, return 404 error to the client
    if (0 === pledges.deletedCount) res.status(404).send('"ids" were not found')

    // Return number of deleted pledge to client
    res.send(pledges.deletedCount)
  }
}
