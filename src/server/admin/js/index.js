/**
 * @todo: Probably use IndexedDB instead of sessionStorage. Maybe use ZangoDB as
 * an interface: https://erikolson186.github.io/zangodb/
 */

const axios = require('axios')
const { showMessage } = require('./message')
const { renderDashboard } = require('./render')

/**
 * Initialize the admin dashboard.
 *
 * @since 1.5.0
 * @since unreleased Save pledges data to sessionStorage and reuse for
 * subsequent page loads.
 */
function init () {
  // Get pledges data from sessionStorage.
  const pledges = sessionStorage.getItem('pledges')

  if (!pledges) {
    // Get pledges data from the API and store it in sessionStorage.
    axios.get('/api/pledges')
      .then(response => {
        sessionStorage.setItem('pledges', JSON.stringify(response.data))

        // Render the admin dashboard with pledges data from sessionStorage.
        renderDashboard(JSON.parse(sessionStorage.getItem('pledges')))
      })
      .catch(error => {
        // Log the error and display it in the UI.
        console.error(error)
        showMessage('error', error)

      })
  } else {
    // Render the admin dashboard with pledges data from sessionStorage.
    renderDashboard(JSON.parse(sessionStorage.getItem('pledges')))
  }
}

init()
