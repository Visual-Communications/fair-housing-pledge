/**
 * Show UI message.
 *
 * @since unreleased
 *
 * @param {string} state   The state.
 * @param {string} message The message.
 */
export function showMessage (state, message) {
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
export function clearMessage () {
  const container = document.querySelector('[data-admin="message"]')
  // Update state and remove any child elements.
  container.setAttribute('data-state', 'inactive')
  container.innerHTML = ''
}
