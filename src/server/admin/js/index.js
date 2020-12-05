import 'regenerator-runtime/runtime'
const { renderDashboard } = require('./render')
const { addDownloadEventListeners } = require('./events')

/**
 * Initialize admin dashboard.
 *
 * @since unreleased
 */
async function init () {
  // Render admin dashboard and add event listeners.
  await renderDashboard()
  addDownloadEventListeners()
}

init()
