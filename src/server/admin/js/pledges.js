const axios = require('axios')
const { showMessage } = require('./message')

/**
 * @todo: Probably use IndexedDB instead of sessionStorage and use ZangoDB as an interface: https://erikolson186.github.io/zangodb/
 */

/**
 * Get pledges data from sessionStorage or API.
 *
 * @since 2.0.0
 *
 * @return {array} Array of pledge objects.
 */
export async function getPledgesData () {
  try {
    if (!sessionStorage.getItem('pledges')) {
      // Get pledges data from API and store in sessionStorage.
      const { data } = await axios.get('/api/pledges')
      sessionStorage.setItem('pledges', JSON.stringify(data))
    }

    // Return pledges data from sessionStorage.
    return JSON.parse(sessionStorage.getItem('pledges'))
  }

  catch (error) {
    return showMessage('error', error)
  }
}
