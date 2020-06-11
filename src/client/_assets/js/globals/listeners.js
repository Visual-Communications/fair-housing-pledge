// IIFE
(function () {

/**
 * Initializes the module.
 * @return {Boolean}
 */
function init () {
  return addListeners()
}

/** --------------------
 *  Storage utilities
 -------------------- */

/**
  * Gets a sessionStorage key, or sessionStorage Object as a String, if no key is specified.
  * @param {String} key
  * @return {String}
  */
function getStorage (key) {
  if (!key) return JSON.stringify(sessionStorage)
  if (sessionStorage[key]) return sessionStorage[key]
  return JSON.stringify(sessionStorage)
}

/**
  * Sets a sessionStorage key to some data, or undefined if no data is given. Returns the data string, or false if no key is provided.
  * @param {String} key
  * @param {String|Object|Array|Number} data
  * @return {Boolean|String}
  */
function setStorage (key, data) {
  if (!key) return false
  const newData = typeof data === 'string' || data instanceof String ?
    data :
    JSON.stringify(data)
  sessionStorage.setItem(key, newData)
  return getStorage(key)
}

/**
  * Removes a sessionStorage key. Returns the removed data string, or false if no key is provided.
  * @param {String} key
  * @return {Boolean}
  */
// function removeStorage (key) {
//   if (!key) return false
//   const data = getStorage(key)
//   sessionStorage.removeItem(key)
//   return data
// }

/** --------------------
 *  DOM utilities
 -------------------- */

/**
 * Creates an HTML DOM element and returns it.
 * @param {String} element
 * @param {String} text
 * @param {Array[Object]} attributes
 * @param {String|Array[String]} classes
 * @return {HTMLElement}
 */
function createElement (element, text, attributes, classes) {
  if (!element) element = 'p'
  var el = document.createElement(element)

  // If there is text, append it
  if (text) el.textContent = text

  // If there is an Array of attributes, add them all
  if (attributes && Array.isArray(attributes)) {
    attributes.forEach(function(attribute) {
      el.setAttribute(attribute.property, attribute.value)
    })
  }

  // If there is a class, or an Array of classes, add the class(es)
  if (classes) {
    if (typeof classes === 'string' || classes instanceof String) {
      classes = [ classes ]
    }
    if (Array.isArray(classes)) {
      classes.forEach(className => {
        el.classList.add(className)
      })
    }
  }

  return el
}

/**
 * Removes the first HTML DOM element to match the given selector, and either returns it, or returns false if no selector is provided.
 * @param {HTMLElement|String} selector
 * @return {HTMLElement|Boolean}
 */
function removeElement (selector) {
  if (!selector) return false
  
  var el = isElement(selector) ? selector : document.querySelector(selector)
  el.parentElement.removeChild(el)

  return el
}

/**
 * Adds HTML markup to the DOM in a container element.
 * @param {String} markup
 * @param {String} container - CSS selector (i.e., '.the-container', or '#theContainer'), defaults to 'body'
 * @return {Boolean}
 */
function addDomMarkup (markup, container) {
  if (!markup) return false
  if (!container) container = 'body'
  document.querySelector(container).appendChild(markup)
  return true
}

// Overwrites native 'children' prototype.
// Adds Document & DocumentFragment support for IE9 & Safari.
// Returns array instead of HTMLCollection.
;(function(constructor) {
  if (constructor &&
    constructor.prototype &&
    constructor.prototype.children == null) {
    Object.defineProperty(constructor.prototype, 'children', {
      get: function() {
        let i = 0
        let node
        let nodes = this.childNodes
        let children = []

        while (node = nodes[i++]) {
          if (node.nodeType === 1) {
            children.push(node)
          }
        }
        return children
      }
    });
  }
})(window.Node || window.Element)

/** --------------------
 *  String Utilities
 -------------------- */

/**
 * Capitalizes the first letter of a String and returns it, or returns false if no String is provided.
 * @param {String} string
 * @return {String|Boolean}
 */
function capitalizeFirstLetter (string) {
  if (!string) return false
  return string.charAt(0).toUpperCase() + string.slice(1);
}

/** --------------------
 *  Object Utilities
 -------------------- */

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

function isElement(obj) {
  try {
    //Using W3 DOM2 (works for FF, Opera and Chrome)
    return obj instanceof HTMLElement;
  }
  catch(e){
    //Browsers not supporting W3 DOM2 don't have HTMLElement and
    //an exception is thrown and we end up here. Testing some
    //properties that all elements have (works on IE7)
    return (typeof obj==="object") &&
      (obj.nodeType===1) && (typeof obj.style === "object") &&
      (typeof obj.ownerDocument ==="object");
  }
}

/** --------------------
 *  Events
 -------------------- */

/**
 * Adds the event listener(s)
 * @return {Boolean}
 */
function addListeners () {
  window.addEventListener('load', handleLoad)
  window.addEventListener('click', handleClick)
  window.addEventListener('submit', handleSubmit)
  return true
}

/**
 * Handles page load.
 * @return {Boolean}
 */
function handleLoad () {
  const fhp = getStorage('fhp')
  const storage = JSON.parse(fhp)
  if (!storage.brand || !storage.courseCompleted) return false
  
  // Pre-fill Brand field
  const brandInput = document.querySelector('#brand')
  if (brandInput) brandInput.value = storage.brand

  if (!storage.pledge) return false

  // Load the certificate
  loadCertificate(storage.brand, JSON.parse(storage.pledge))

  return true
}

/**
 * Loads the certificate.
 * @param {String} brand
 * @param {Object} pledge
 * @return {Boolean}
 */
function loadCertificate (brand, pledge) {
  // Wipe DOM markup
  const body = document.querySelector('body')
  const childrenArray = Array.prototype.slice.call(body.children)
  childrenArray.forEach(child => {
    removeElement(child)
  })


  // Generate certificate markup
  const markup = document.createDocumentFragment()
  const header = createElement('header', null, [
    { property: 'style', value: 'padding: 4em 0; text-align: center;' }
  ], ['container'])
  const logo = createElement('img', null, [
    { property: 'alt', value: brand }
  ], null)
  const main = createElement('main', null, [
    { property: 'style', value: 'text-align: center;' }
  ], ['container'])
  const title = createElement('h1', 'Certificate of Completion', [
    { property: 'style', value: 'font-size: 2rem; margin-bottom: 1em;' }
  ], null)
  const p1 = createElement('p', `is hereby granted to ${pledge.firstName} ${pledge.lastName}`, null, null)
  const p2 = createElement('p', 'to certify that they have completed to satisfaction the Fair Housing Pledge.', null, null)
  const date = new Date()
  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
  const p3 = createElement('p', `Granted: ${monthNames[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`, null, null)
  const signature = createElement('img', null, [
    { property: 'alt', value: 'FULL_NAME' },
    { property: 'style', value: 'margin-top: 2em;' }
  ], null)
  const name = createElement('p', 'FULL_NAME, TITLE', null, null)
  const icon = createElement('img', null, [
    { property: 'alt', value: '' }
  ], null)
  const footer = createElement('footer', null, [
    { property: 'style', value: 'text-align: center;' }
  ], ['container'])
  const disclaimer = createElement('p', 'DISCLAIMER', null, null)

    header.appendChild(logo)
  markup.appendChild(header)
    main.appendChild(title)
    main.appendChild(p1)
    main.appendChild(p2)
    main.appendChild(p3)
    main.appendChild(signature)
    main.appendChild(name)
    main.appendChild(icon)
  markup.appendChild(main)
    footer.appendChild(disclaimer)
  markup.appendChild(footer)

  // Append certificate markup to DOM
  addDomMarkup(markup, 'body')

}

/**
 * Handles click(s).
 * @return {Boolean}
 */
function handleClick (event) {
  // Check if the course is finished and the pledge button is clicked
  const done = document.querySelector('[data-acc-text="100%"]')
  if (!done) return false

  const unlocked = window.getComputedStyle(done).getPropertyValue('display') === 'block'
  const pledgeButton = event.target.parentElement.parentElement.parentElement.parentElement.getAttribute('data-acc-text') === 'Rectangular Hotspot 1'
  if (!unlocked || !pledgeButton) return false

  // Prevent event propogation
  event.preventDefault()

  // Get the brand
  let brand = document.querySelector('title').textContent.replace('The Promise to Deliver Fair Housing', '').trim()
  if (brand === '') brand = 'Coldwell Banker'

  // Send a Google Analytics event
  if (window.gtag) {
    const eventData = {
      event_category: brand + ' Course',
      event_label: 'Finish'
    }
    window.gtag('event', 'course_view', eventData)
  }

  // Save the brand to session storage
  sessionStorage.setItem('fhp', JSON.stringify({
    brand,
    courseCompleted: true
  }))

  // Trigger the click event
  event.target.click()
  return true
}

/**
 * Handles form submissions.
 * @return {Boolean}
 */
function handleSubmit (event) {
  event.preventDefault()

  // Send a Google Analytics event
  if (window.gtag) {
    window.gtag('event', 'sign_up', {
      method: capitalizeFirstLetter(event.target.name)
    })
  }

  // Save form to sessionStorage
  const fhp = getStorage('fhp')
  const storage = JSON.parse(fhp)
  const data = JSON.stringify(serializeObject(event.target))
  storage.pledge = data
  setStorage('fhp', storage)

  // Send form to the API
  sendPledgeToApi(event)

  // Submit the form
  event.target.submit()
  return true
}

/**
 * Send the Pledge form results to the API.
 */
function sendPledgeToApi (event) {
  console.log('sendPledgeToApi()')
  if (!event.target.matches('#pledge')) return false

  event.preventDefault()
  console.log('event.preventDefault()')

  // fetch('https://fairhousingpledge.com/api/pledges', {
  fetch('http://localhost:3000/api/pledges', {
    method: 'POST',
    body: JSON.stringify(serializeObject(event.target)),
    mode: 'cors'
  }).then(function (response) {
    if (response.ok) {
      console.log('response.ok')
      return response.json()
    }
    console.log('response not ok')
    return Promise.reject(response)
  }).then(function (data) {
    console.log(data)
  }).catch(function (error) {
    console.warn('API error:', error)
  }).finally(function () {
    // event.target.submit()
    console.log('Finished')
  })
}

/** --------------------
 *  Initialize
 -------------------- */

/**
 * Initialize the module.
 */
return init()
})()