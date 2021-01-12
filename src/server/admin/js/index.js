import 'regenerator-runtime/runtime'
const { Dashboard } = require('./classes/Dashboard')

/**
 * Initialize admin dashboard.
 *
 * @since 2.0.0
 */
async function init () {
  const dashboard = new Dashboard()
}

init()
