// IIFE
(function () {

/**
 * Initializes the pledge form
 */
function init () {
  addSubmitListeners()
}

/**
 * Add submit event listener(s)
 */
function addSubmitListeners () {
  document.addEventListener('submit', function (event) {
    // Handler function(s)
    handlePledgeForm(event);
  })
}

/**
 * Handles pledge form
 */
function handlePledgeForm (event) {
  if (!event.target.matches('#pledge')) return

  event.preventDefault()

  fetch('/api/pledges', {
    method: 'POST',
    body: new FormData(event.target),
  }).then(function (response) {
    if (response.ok) {
      return response.json()
    }
    return Promise.reject(response)
  }).then(function (data) {
    console.log(data)
  }).catch(function (error) {
    console.warn(error)
  })
}

/**
 * Initialize the pledge form
 */
init()

})()