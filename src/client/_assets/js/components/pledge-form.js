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

/*!
 * Serialize all form data into an object of key/value pairs
 * (c) 2020 Chris Ferdinandi, MIT License, https://gomakethings.com
 * @param  {Node}   form The form to serialize
 * @return {Object}      The serialized form data
 */
var serializeObject = function (form) {
  var obj = {}
  Array.prototype.slice.call(form.elements).forEach(function (field) {
    if (!field.name || field.disabled || ['file', 'reset', 'submit', 'button'].indexOf(field.type) > -1) return
    if (field.type === 'select-multiple') {
      var options = []
      Array.prototype.slice.call(field.options).forEach(function (option) {
        if (!option.selected) return
        options.push(option.value)
      })
      if (options.length) {
        obj[field.name] = options
      }
      return
    }
    if (['checkbox', 'radio'].indexOf(field.type) >-1 && !field.checked) return
    obj[field.name] = field.value
  })
  return obj
}

/**
 * Handles pledge form
 */
function handlePledgeForm (event) {
  if (!event.target.matches('#pledge')) return

  event.preventDefault()

  // TODO: Client-side validation

  fetch('https://fairhousingpledge.com/api/pledges', {
    method: 'POST',
    body: JSON.stringify(serializeObject(event.target)),
  }).then(function (response) {
    if (response.ok) {
      return response.json()
    }
    return Promise.reject(response)
  }).then(function (data) {
    console.log(data)
  }).catch(function (error) {
    console.warn(error)
  }).finally(function () {
    event.target.submit()
  })
}

/**
 * Initialize the pledge form
 */
init()

})()