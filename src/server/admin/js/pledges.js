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

/**
 * Get pledges markup.
 *
 * @since 2.1.0
 *
 * @param  {array} pledges Array of pledge objects.
 * @return {string}        Markup.
 */
export function getPledgesMarkup (pledges) {
  try {
    // Build pledges dashboard data.
    const dashboardPledges = pledges.map(pledge => {
      return {
        'Name': `${pledge.firstName} ${pledge.lastName}`,
        'Email': pledge.email,
        // @todo: Rename brands.
        'Brand': pledge.brand,
        'Course': pledge.courseCompleted,
      }
    })

    // Build the table.
    const table = document.createElement('table')
    table.classList.add('admin__pledges')

    // Build and append table headers.
    const thead = document.createElement('thead')
    const tr = document.createElement('tr')
    const headers = Object.keys(dashboardPledges[0])
    headers.forEach(header => {
      const th = document.createElement('th')
      th.textContent = header
      tr.appendChild(th)
    })
    thead.appendChild(tr)
    table.appendChild(thead)

    // Build and append table rows.
    const tbody = document.createElement('tbody')
    dashboardPledges.forEach(pledge => {
      // Build the row.
      const tr = document.createElement('tr')
      Object.keys(pledge).forEach(cell => {
        const td = document.createElement('td')
        td.textContent = pledge[cell]
        tr.appendChild(td)
      })

      // Append the row.
      tbody.appendChild(tr)
    })
    table.appendChild(tbody)

    // Build and return the markup.
    const markup = document.createDocumentFragment()
    markup.appendChild(table)
    showMessage('message', markup)
    return markup
  }

  catch (error) {
    return showMessage('error', error)
  }
}
