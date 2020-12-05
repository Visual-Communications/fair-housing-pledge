const { showMessage } = require('./message')

/**
 * @todo: Probably store the data in IndexedDB and use ZangoDB as an interface: https://erikolson186.github.io/zangodb/
 */

/**
 * Get summary data.
 *
 * @since 2.0.0
 *
 * @param  {array} pledges Array of pledge objects.
 * @return {Object}        Summary brands data object.
 */
export function getSummaryData (pledges) {
  try {
    // Build brands pledges data and store in localStorage.
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

    /**
     * Filter pledges data by brand.
     *
     * @since 2.0.0
     *
     * @param  {string}  string  String to filter pledge brand name by.
     * @return {array}           Filtered array of pledge objects.
     */
    function getPledgesBrand (string) {
      return pledges.filter(pledge => pledge.brand.includes(string))
    }

    Object.keys(brands).forEach(brand => {
      // Add brand name.
      brands[brand].name = brands[brand].pledges[0].brand

      // Add pledges count.
      brands[brand].pledgesCount = brands[brand].pledges.length

      // Add courseCompleted count.
      brands[brand].courseCompletedCount = brands[brand].pledges
        .filter(pledge => 'true' === pledge.courseCompleted)
        .length
    })

    // Update brand names.
    brands.bhgre.name = 'BHGRE'
    brands.c21.name = 'Century 21'
    brands.cb.name = 'Coldwell Banker'
    brands.era.name = 'ERA'
    brands.sir.name = 'Sotheby\'s'
    brands.total.name = 'Total'

    // Store summary data with brands and current date in localStorage.
    const summary = { data: brands, date: new Date() }
    return brands
  }

  catch (error) {
    return showMessage('error', error)
  }
}

/**
 * Get admin dashboard summary markup.
 *
 * @since 2.0.0
 * 
 * @param {Object} brands Brands data.
 */
export function getSummaryMarkup (brands) {
  try {
    // Build the table.
    const table = document.createElement('table')
    table.classList.add('admin__brands')

    // Build and append table headers.
    const thead = document.createElement('thead')
    const tr = document.createElement('tr')
    const headers = ['Brand', 'Pledges', 'Course', 'No Course']
    headers.forEach(header => {
      const th = document.createElement('th')
      th.textContent = header
      tr.appendChild(th)
    })
    thead.appendChild(tr)
    table.appendChild(thead)

    // Build and append table rows.
    const tbody = document.createElement('tbody')
    Object.keys(brands).forEach(brand => {
      // Build the row.
      const tr = document.createElement('tr')

      // Append the row header.
      const th = document.createElement('th')
      th.textContent = brands[brand].name
      tr.appendChild(th)

      // Append the row cells.
      const cells = [
        brands[brand].pledgesCount,
        brands[brand].courseCompletedCount,
        brands[brand].pledgesCount - brands[brand].courseCompletedCount
      ]
      cells.forEach(cell => {
        const td = document.createElement('td')
        td.textContent = cell
        tr.appendChild(td)
      })

      // Append the row.
      tbody.appendChild(tr)
    })
    table.appendChild(tbody)

    // Build and return the markup.
    const markup = document.createDocumentFragment()
    markup.appendChild(table)
    return markup
  }

  catch (error) {
    return showMessage('error', error)
  }
}
