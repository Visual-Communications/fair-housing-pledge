const axios = require('axios')

/**
 * Initialize the admin dashboard.
 *
 * @since unreleased
 */
function init () {
  // Get pledge data.
  axios.get('/api/pledges')
    .then(response => {
      // Render admin dashboard.
      renderDashboard(response.data)
    })
    .catch(error => {
      console.error(error)
      // Refresh the page.
      location.reload()
    })
}

/**
 * Render admin dashboard.
 *
 * @since unreleased
 * 
 * @param {array} pledges Array of pledge objects.
 */
function renderDashboard (pledges) {
  // Remove loading message.
  const loading = document.querySelector('[data-admin="loading"]')
  loading.parentElement.removeChild(loading)

  // Render the dashboard.
  const dashboard = document.querySelector('[data-admin="dashboard"]')
  dashboard.appendChild(getDashboardMarkup(pledges))
}

/**
 * Render admin dashboard markup.
 *
 * @since unreleased
 * 
 * @param {array} pledges Array of pledge objects.
 */
function getDashboardMarkup (pledges) {
  // Build the data.
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

  function getPledgesBrand(string) {
    return pledges.filter(pledge => pledge.brand.includes(string))
  }

  // Build brands data.
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

  // Custommize brand names.
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
