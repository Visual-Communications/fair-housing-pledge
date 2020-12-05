/**
 * Get admin dashboard summary markup.
 *
 * @since 1.5.0
 * @since unreleased Abstract brands logic to its own function.
 * 
 * @param {Object} brands Brands data.
 */
export function getSummaryMarkup (brands) {
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

/**
 * Get download section markup.
 *
 * @since unreleased
 *
 * @return {string}         Download section markup.
 */
export function getDownloadMarkup (contexts) {
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
