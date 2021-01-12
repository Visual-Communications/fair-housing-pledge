const axios = require('axios')
const Papa = require('papaparse')
const { showMessage, showError, clearMessage } = require('../message')
const { abbreviateBrandName, abbreviateState } = require('../abbreviation')

/**
 * Dashboard class.
 */
export class Dashboard {
  constructor() {
    // Build data shapes.
    this.pledges = {
      raw: null,
      data: null,
      markup: null,
    }
    this.summary = {
      data: null,
      markup: null,
    }
    this.download = {
      markup: null,
    }

    // Handle async tasks in a separate async initializer function.
    this.init()
  }

  /**
   * Initialize the class.
   *
   * @since unreleased
   *
   * @return {[type]} [description]
   */
  async init () {
    // Build pledges data.
    this.pledges.raw = await this.getPledgesRawData()
    this.pledges.data = this.getPledgesData()

    // Build summary data.
    this.summary.data = this.getSummaryData()

    // Build download markup.
    this.download.markup = this.getDownloadMarkup(['summary', 'pledges'])

    // Render the dashboard.
    this.renderDashboard()
  }

  /**
   * Get pledges raw data from sessionStorage or API.
   *
   * @since unreleased
   *
   * @return {array} Array of pledge objects.
   */
  async getPledgesRawData () {
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
      return showError(error)
    }
  }

  /**
   * Get pledges data formatted for dashboard.
   *
   * @since unreleased
   *
   * @return {Object[]} Array of pledge objects.
   */
  getPledgesData () {
    return this.pledges.raw.map(pledge => {
      const date = new Date(pledge.created_at)
      return {
        first: pledge.firstName,
        last: pledge.lastName,
        email: pledge.email.toLowerCase(),
        brand: abbreviateBrandName(pledge.brand),
        company: pledge.company,
        state: abbreviateState(pledge.state),
        course: pledge.courseCompleted === 'true' ? '✅' : '❌',
        date: `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`,
      }
    })
  }

  /**
   * Filter pledges data by brand.
   *
   * @since unreleased
   *
   * @param  {string}  string  String to filter pledge brand name by.
   * @return {array}           Filtered array of pledge objects.
   */
  getPledgesBrand (string) {
    return this.pledges.raw.filter(pledge => pledge.brand.includes(string))
  }

  /**
   * Get summary data.
   *
   * @since unreleased
   *
   * @return {Object} Summary data.
   */
  getSummaryData () {
    try {
      // Build brands pledges data and store in localStorage.
      const brands = {
        bhgre: { pledgesData: this.getPledgesBrand('Better Homes') },
        c21: { pledgesData: this.getPledgesBrand('Century') },
        cb: { pledgesData: this.getPledgesBrand('Coldwell Banker') },
        corcoran: { pledgesData: this.getPledgesBrand('Corcoran') },
        era: { pledgesData: this.getPledgesBrand('ERA') },
        other: { pledgesData: this.getPledgesBrand('Other') },
        realogy: { pledgesData: this.getPledgesBrand('Realogy Corporate') },
        rtg: { pledgesData: this.getPledgesBrand('Realogy Title Group') },
        sir: { pledgesData: this.getPledgesBrand('Sotheby\'s') },
        total: { pledgesData: this.pledges.raw }
      }

      Object.keys(brands).forEach(brand => {
        brands[brand].brand = brands[brand].pledgesData[0].brand
        brands[brand].pledges = brands[brand].pledgesData.length
        brands[brand].course = brands[brand].pledgesData
          .filter(pledge => pledge.courseCompleted === 'true')
          .length
        brands[brand]['no-course'] =
          brands[brand].pledges - brands[brand].course
        delete brands[brand].pledgesData
      })

      // Update brand brands.
      brands.bhgre.brand = 'BHGRE'
      brands.c21.brand = 'Century 21'
      brands.cb.brand = 'Coldwell Banker'
      brands.era.brand = 'ERA'
      brands.sir.brand = 'Sotheby\'s'
      brands.total.brand = 'Total'

      return Object.values(brands)
    }

    catch (error) {
      return showError(error)
    }
  }

  /**
   * Get table markup.
   *
   * @since  unreleased
   *
   * @param  {string}  type             Table type.
   * @param  {array}   headers          Table headers.
   * @param  {array}   records          Table records.
   * @param  {boolean} hasRecordHeaders Whether or not records have row headers.
   * @return {string}                   Table markup.
   */
  getTableMarkup ({ type, headers, records, hasRecordHeaders = false }) {
    try {
      // Build the table.
      const table = document.createElement('table')
      table.classList.add('admin__table')
      table.setAttribute('data-element', type)

      // Build and append table headers.
      const thead = document.createElement('thead')
      const tr = document.createElement('tr')
      headers.forEach(header => {
        const button = document.createElement('button')
        const th = document.createElement('th')
        button.textContent = header
        button.setAttribute('data-action', 'sort')
        button.setAttribute('data-sort-trigger', type)
        button.setAttribute('data-sort-by', header.toLowerCase().replace(' ', '-'))
        th.appendChild(button)
        tr.appendChild(th)
      })
      thead.appendChild(tr)
      table.appendChild(thead)

      // Build and append table rows.
      const tbody = document.createElement('tbody')
      tbody.setAttribute('data-sort-target', type)
      const recordsLoop = Array.isArray(records) ? records : Object.keys(records)
      recordsLoop.forEach((record, recordIndex) => {
        // Build the row.
        const tr = document.createElement('tr')

        if (hasRecordHeaders) {
          // Build and append the row header.
          const th = document.createElement('th')
          th.textContent = Array.isArray(records)
            ? Object.values(records[recordIndex])[0]
            : Object.values(records[record])[0]
          tr.appendChild(th)
        }

        // Get the row cells.
        const cells = Array.isArray(records)
          ? Object.values(record)
          : Object.values(records[record])

        // Append the row cells.
        cells.forEach((cell, cellIndex) => {
          if (hasRecordHeaders && cellIndex === 0) return
          const td = document.createElement('td')

          // Add email link markup.
          if (headers[cellIndex] === 'email') {
            const a = document.createElement('a')
            a.setAttribute('href', `mailto:${cell}`)
            a.textContent = cell
            td.appendChild(a)
          } else {
            td.textContent = cell
          }
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
      return showError(error)
    }
  }

  /**
   * Get download section markup.
   *
   * @since unreleased
   *
   * @param  {array}  Array of context strings.
   * @return {string} Download section markup.
   */
  getDownloadMarkup (contexts) {
    // Build the markup.
    const markup = document.createDocumentFragment()

    // For each context...
    contexts.forEach((context, index) => {
      // Build the markup.
      const li = document.createElement('li')
      const button = document.createElement('button')

      // Add classes.
      li.classList.add('admin__nav-list-item')
      li.classList.add('admin__nav-list-item_button')
      button.classList.add('admin__download-button')

      // Add attributes.
      button.setAttribute('type', 'button')
      button.setAttribute('data-admin', 'download')
      button.setAttribute('data-download', context)

      // Add text content.
      button.textContent = `Download ${context}`

      // Append the markup.
      li.appendChild(button)
      markup.appendChild(li)
    })

    // Return the markup.
    return markup
  }

  /**
   * Render admin dashboard.
   *
   * @since unreleased
   */
  async renderDashboard () {
    // Build markup.
    this.pledges.markup = this.getTableMarkup ({
      type: 'pledges',
      headers: Object.keys(this.pledges.data[0]),
      records: this.pledges.data
    })
    this.summary.markup = this.getTableMarkup ({
      type: 'summary',
      headers: ['Brand', 'Pledges', 'Course', 'No Course'],
      records: this.summary.data,
      hasRecordHeaders: true
    })

    const dashboard = document.querySelector('[data-admin="dashboard"]')

    // Render the summary markup.
    const summary = document.querySelector('[data-element="summary"]')
    if (summary) {
      dashboard.replaceChild(this.summary.markup.cloneNode(true), summary)
    } else {
      dashboard.appendChild(this.summary.markup.cloneNode(true))
    }
    
    // Render the pledges markup.
    const pledges = document.querySelector('[data-element="pledges"]')
    if (pledges) {
      dashboard.replaceChild(this.pledges.markup.cloneNode(true), pledges)
    } else {
      dashboard.appendChild(this.pledges.markup.cloneNode(true))
    }

    // Listen for sort clicks.
    this.addSortEventListeners()
    
    // Render the download markup.
    const navigation = document.querySelector('.admin__nav-list')
    if (navigation.getAttribute('data-has') !== 'download') {
      navigation.insertBefore(this.download.markup, navigation.querySelector('[data-admin-nav="logout"]'))
      navigation.setAttribute('data-has', 'download')

      // Listen for download clicks.
      this.addDownloadEventListeners()
    }

    // Remove loading message.
    clearMessage()
  }

  /**
   * Format objects keys in an array.
   *
   * @since unreleased
   *
   * @param  {Array} object The original array of objects.
   * @return {Array}        The formatted array of objects.
   */
  formatKeys (array) {
    const formatted = array.map(object => {
      const format = {}
      Object.entries(object).forEach(entry => {
        const key = entry[0]
          .split('-')
          .join(' ')
          .replace(
            /\w\S*/g,
            w => (w.replace(
              /^\w/,
              c => c.toUpperCase())
            )
          )
        format[key] = entry[1]
      })
      return format
    })
    return formatted
  }

  /**
   * Add Download event listeners.
   *
   * @since unreleased
   */
  addDownloadEventListeners () {
    const buttons = document.querySelectorAll('[data-admin="download"]')
    for (let i = 0; i < buttons.length; i++) {
      buttons[i].addEventListener('click', event => {
        this.handleDownload({
          event,
          data: {
            summary: this.formatKeys(this.summary.data),
            pledges: this.formatKeys(this.pledges.data)
          }
        })
      })
    }
  }

  /**
   * Handle download.
   *
   * @since unreleased
   *
   * @param {Event} event Click event.
   */
  async handleDownload ({ event, data }) {
    // Prevent default click behavior.
    event.preventDefault()

    try {
      // Build CSV data.
      const download = event.target.getAttribute('data-download')
      const csv = new Blob(
        [Papa.unparse(data[download])],
        { type: 'text/plain' }
      )

      // Build invisible download link and click it.
      const url = window.URL.createObjectURL(csv)
      const hyperlink = document.createElement('a')
      hyperlink.setAttribute('href', url)
      const date = new Date()
      hyperlink.setAttribute('download', `${download}_${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}.csv`)
      hyperlink.textContent = `Download ${download}`
      hyperlink.click()
    }

    catch (error) {
      showMessage('error', error)
    }
  }

  /**
   * Add sort event listeners.
   *
   * @since unreleased
   */
  addSortEventListeners () {
    const buttons = document.querySelectorAll('[data-action="sort"]')
    for (let i = 0; i < buttons.length; i++) {
      // Use anonymous function in order to access `this`.
      buttons[i].addEventListener('click', event => {
        const { trigger, sorted } = this.sortTableRows({
          button: event.target,
          data: {
            summary: this.summary.data,
            pledges: this.pledges.data
          }
        })
        this[trigger].data = sorted
        this.renderDashboard()
      })
    }
  }

  /**
   * Sort table rows.
   *
   * @since unreleased
   *
   * @param {HTMLElement} button The clicked button.
   * @param {object}      data   The data to sort.
   * @return                     The sorted data.
   */
  sortTableRows ({ button, data }) {
    // If a sort button was not clicked, bail.
    if (button.getAttribute('data-action') !== 'sort') return

    // Sort the data.
    const trigger = button.getAttribute('data-sort-trigger') // summary
    const sortBy = button.getAttribute('data-sort-by') // course
    const sorted = data[trigger]
      .sort((a, b) => {
        // @todo: Toggle asc/desc on click.
        if (typeof a[sortBy] === 'string' || a[sortBy] instanceof String) {
          // Ascending order.
          return a[sortBy] > b[sortBy] ? 1 : -1
        } else {
          // Descending order.
          return a[sortBy] < b[sortBy] ? 1 : -1
        }
      })

    return {
      trigger,
      sorted: [
        // Move Total to last array position.
        ...sorted.filter(item => item[Object.keys(item)[0]] !== 'Total'),
        ...sorted.filter(item => item[Object.keys(item)[0]] === 'Total')
      ]
    }
  }
}
