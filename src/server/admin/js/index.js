const axios = require('axios')

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

/**
 * Show UI message.
 *
 * @since unreleased
 *
 * @param {string} state   The state.
 * @param {string} message The message.
 */
function showMessage (state, message) {
  // Set state and remove any child elements.
  const container = document.querySelector('[data-admin="message"]')
  container.setAttribute('data-state', state)
  container.innerHTML = ''

  // Add message.
  const paragraph = document.createElement('p')
  paragraph.textContent = message
  container.appendChild(paragraph)
}

/**
 * Clear message.
 * 
 * @since unreleased
 */
function clearMessage () {
  const container = document.querySelector('[data-admin="message"]')
  // Update state and remove any child elements.
  container.setAttribute('data-state', 'inactive')
  container.innerHTML = ''
}

/**
 * Render admin dashboard.
 *
 * @since 1.5.0
 * 
 * @param {array} pledges Array of pledge objects.
 */
function renderDashboard (pledges) {
  // Remove loading message.
  clearMessage()

  // Render the dashboard.
  const dashboard = document.querySelector('[data-admin="dashboard"]')
  dashboard.appendChild(getDashboardMarkup(pledges))
}

/**
 * Render admin dashboard markup.
 *
 * @since 1.5.0
 * 
 * @param {array} pledges Array of pledge objects.
 */
function getDashboardMarkup (pledges) {
  /**
   * Filter pledges data by brand.
   *
   * @since 1.5.0
   *
   * @param  {string}  string  String to filter pledge brand name by.
   * @return {array}           Filtered array of pledge objects.
   */
  function getPledgesBrand(string) {
    return pledges.filter(pledge => pledge.brand.includes(string))
  }

  // Build brands pledges data.
  const brands = {
    bhgre: { pledges: getPledgesBrand('Better Homes') },
    c21: { pledges: getPledgesBrand('Century') },
    cb: { pledges: getPledgesBrand('Coldwell Banker') },
    corcoran: { pledges: getPledgesBrand('Corcoran') },
    era: { pledges: getPledgesBrand('ERA') },
    other: { pledges: getPledgesBrand('Other') },
    realogy: { pledges: getPledgesBrand('Realogy Corporate') },
    rtg: { pledges: getPledgesBrand('Realogy Title Group') },
    sir: { pledges: getPledgesBrand('Sotheby\'s') },
    total: { pledges: pledges }
  }

  Object.keys(brands).forEach(brand => {
    // Add brand name.
    brands[brand].name = brands[brand].pledges[0].brand

    // Add pledges count.
    brands[brand].pledgesCount = brands[brand].pledges.length

    // Add courseCompleted count.
    brands[brand].courseCompletedCount =
      brands[brand].pledges.filter(pledge => 'true' === pledge.courseCompleted)
        .length
  })

  // Update brand names.
  brands.bhgre.name = 'BHGRE'
  brands.c21.name = 'Century 21'
  brands.cb.name = 'Coldwell Banker'
  brands.era.name = 'ERA'
  brands.sir.name = 'Sotheby\'s'
  brands.total.name = 'Total'

  // Build the markup.
  const markup = document.createDocumentFragment()
  const table = document.createElement('table')
  const thead = document.createElement('thead')
  const tr = document.createElement('tr')
  const th1 = document.createElement('th')
  const th2 = document.createElement('th')
  const th3 = document.createElement('th')
  const th4 = document.createElement('th')
  const tbody = document.createElement('tbody')

  // Add attributes.
  table.classList.add('admin__brands')

  // Set text content.
  th1.textContent = 'Brand'
  th2.textContent = 'Pledges'
  th3.textContent = 'Course'
  th4.textContent = 'No Course'

  Object.keys(brands).forEach(brand => {
    // Build the markup.
    const tr = document.createElement('tr')
    const th = document.createElement('th')
    const td1 = document.createElement('td')
    const td2 = document.createElement('td')
    const td3 = document.createElement('td')

    // Set text content.
    th.textContent = brands[brand].name
    td1.textContent = brands[brand].pledgesCount
    td2.textContent = brands[brand].courseCompletedCount
    td3.textContent =
      brands[brand].pledgesCount - brands[brand].courseCompletedCount

    // Append the markup.
      tr.appendChild(th)
      tr.appendChild(td1)
      tr.appendChild(td2)
      tr.appendChild(td3)
    tbody.appendChild(tr)
  })

  // Append the markup.
        tr.appendChild(th1)
        tr.appendChild(th2)
        tr.appendChild(th3)
        tr.appendChild(th4)
      thead.appendChild(tr)
    table.appendChild(thead)
    table.appendChild(tbody)
  markup.appendChild(table)

  // Return the markup.
  return markup
}

init()
