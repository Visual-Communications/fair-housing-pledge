const Joi = require('@hapi/joi')
const mongoose = require('mongoose')
mongoose.set('useCreateIndex', true)
const uniqueValidator = require('mongoose-unique-validator')

/**
 * Define Pledge model
 */
const Pledge = mongoose.model('Pledge', new mongoose.Schema({
  firstName: { type: String, required: true, trim: true, maxLength: 255 },
  lastName: { type: String, required: true, trim: true, maxLength: 255 },
  email: { type: String, required: true, trim: true, minLength: 5, maxLength: 255, unique: true, uniqueCaseInsensitive: true },
  state: { type: String, required: false, trim: true, maxLength: 255 },
  brand: { type: String, required: false, trim: true, maxLength: 255 },
  company: { type: String, required: false, trim: true, maxLength: 255 },
  event: { type: String, required: false, trim: true, maxLength: 255 },
  agreeToTerms: { type: String, required: true, trim: true, maxLength: 5 },
  courseCompleted: { type: String, required: false, trim: true, maxLength: 255 },
  ip: { type: String, trim: true, maxLength: 255 },
  user_agent: { type: String, trim: true, maxLength: 255 },
  referrer: { type: String, trim: true, maxLength: 255 },
  created_at: { type: Date, default: Date.now },
  'turtle-home': { type: String, required: false, trim: true, maxLength: 0 },
  'form-name': { type: String, required: false, trim: true, maxLength: 6 }
}).plugin(uniqueValidator))

const validate = {
  /**
   * Validate an pledge to create
   */
  create: function (pledge) {
    const schema = Joi.object({
      firstName: Joi.string().required().trim().max(255),
      lastName: Joi.string().required().trim().max(255),
      email: Joi.string().required().trim().min(5).max(255).email(),
      state: Joi.string().allow('').default('N/A').trim().max(255),
      brand: Joi.string().allow('').default('N/A').trim().max(255),
      company: Joi.string().allow('').default('N/A').trim().max(255),
      event: Joi.string().allow('').default('N/A').trim().max(255),
      agreeToTerms: Joi.string().required().trim().max(5),
      courseCompleted: Joi.string().allow('').default('N/A').trim().max(255),
      ip: Joi.string().trim().max(255),
      user_agent: Joi.string().trim().max(255),
      referrer: Joi.string().trim().max(255),
      created_at: Joi.date(),
      'turtle-home': Joi.string().allow('').default('').trim().max(0),
      'pledge-name': Joi.string().allow('').default('').trim().valid('pledge').max(6)
    })

    return schema.validate(pledge)
  },
  /**
   * Validate an pledge to update
   */
  update: function (pledge) {
    const schema = Joi.object({
      firstName: Joi.string().trim().max(255),
      lastName: Joi.string().trim().max(255),
      email: Joi.string().trim().min(5).max(255).email(),
      state: Joi.string().trim().max(255),
      brand: Joi.string().trim().max(255),
      company: Joi.string().trim().max(255),
      event: Joi.string().trim().max(255),
      agreeToTerms: Joi.string().trim().max(5),
      courseCompleted: Joi.string().trim().max(255),
      ip: Joi.string().trim().max(255),
      user_agent: Joi.string().trim().max(255),
      referrer: Joi.string().trim().max(255),
      created_at: Joi.date()
    }).or('firstName', 'lastName', 'email', 'state', 'brand', 'company', 'event', 'agreeToTerms', 'courseCompleted', 'ip', 'user_agent', 'referrer', 'created_at')

    return schema.validate(pledge)
  }
}

exports.Pledge = Pledge
exports.validate = validate
