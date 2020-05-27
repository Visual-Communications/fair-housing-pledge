const { log } = require('../modules/logger')
const { Pledge, validate } = require('../models/pledge')
const _ = require('lodash')

module.exports = {
  /**
   * Get pledges
   */
  getPledges: async (req, res) => {
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
    res.send(pledges)
  },

  /**
   * Create a pledge
   */
  createPledge: async (req, res) => {
    // Validate pledge
    const { error } = validate.create(req.body)
    if (error) return res.status(400).send(error.details[0].message)

    // Create pledge
    let pledge = new Pledge(_.pick(req.body, ['firstName', 'lastName', 'email', 'state', 'brand', 'company', 'event', 'agreeToTerms']))

    // TODO: Get and add ip, referrer, user_agent
    // https://codeburst.io/how-to-get-users-ip-details-in-expressjs-ff5252728604

    // Add pledge to the database
    pledge = await pledge.save()

    log.info('Pledge created.', _.pick(pledge, ['_doc', 'level', 'message', 'timestamp']))

    // Return pledge to the client
    res.send(pledge)
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

    // Update the pledge in the database, and get the updated pledge
    const pledge = await Pledge.findByIdAndUpdate(req.params.id, requestBody, { new: true })

    // If pledge does not exist, return 404 error to the client
    if (!pledge) res.status(404).send('"id" was not found')

    log.info('Pledge updated.', _.pick(pledge, ['_doc', 'level', 'message', 'timestamp']))

    // Return updated pledge to client
    res.send(pledge)
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
  }
}
