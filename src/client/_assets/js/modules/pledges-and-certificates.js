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
 *  Window utilities
 -------------------- */

/**
  * Gets a URL query string parameter
  * Learn more: https://davidwalsh.name/query-string-javascript
  * @param {String} name
  * @return {String}
  */
function getUrlParameter (name) {
  name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]') // eslint-disable-line
  var regex = new RegExp('[\\?&]' + name + '=([^&#]*)')
  var results = regex.exec(location.search)
  return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '))
}

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

        while (node = nodes[i++]) { // eslint-disable-line
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

  // Check for a `brand` query parameter,
  // then use that, and set the course to completed
  const query = getUrlParameter('brand')
  if (query && query !== '') {
    storage.brand = query
    storage.courseCompleted = true
  }

  // If the course isn't completed, we're done
  if (!storage.courseCompleted) return false
  
  // Pre-fill courseCompleted field
  const courseCompletedInput = document.querySelector('#courseCompleted')
  if (courseCompletedInput) courseCompletedInput.value = storage.courseCompleted

  // If there is no brand, we're done
  if (!storage.brand) return false
  
  // Pre-fill Brand field
  const brandInput = document.querySelector('#brand')
  if (brandInput) brandInput.value = storage.brand

  // If the pledge hasn't been filled out yet, we're done
  if (!storage.pledge) return false

  // Both the course and pledge are completed, so load the certificate
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

  // Add .certificate class
  body.classList.add('certificate')

  // Brand content
  const brands = {
    'BHGRE': {
      logo: '/img/logos/logo-bhgre.svg',
      executive: {
        name: 'Sherry A. Chris',
        title: 'President and Chief Executive Officer',
        company: 'Realogy Expansion Brands',
        signature: '/img/signatures/sherry-chris.jpg'
      },
      icon: '/img/icons/fhp-icon-bhgre.svg',
      class: 'bhgre',
      disclaimer: '© 2020 Better Homes and Gardens Real Estate LLC. All rights reserved. Better Homes and Gardens® and the Better Homes and Gardens Real Estate Logo are registered service marks owned by Meredith Corporation and licensed to Better Homes and Gardens Real Estate LLC.Better Homes and Gardens Real Estate LLC fully supports the principles of the Fair Housing Act and the Equal Opportunity Act. Each office is independently owned and operated.'
    },
    'C21': {
      logo: '/img/logos/logo-c21.svg',
      executive: {
        name: 'Michael Miedler',
        title: 'President and Chief Executive Officer',
        company: 'Century 21 Real Estate LLC',
        signature: '/img/signatures/michael-miedler.jpg'
      },
      icon: '/img/icons/fhp-icon-c21.svg',
      class: 'c21',
      disclaimer: '© 2020 Century 21 Real Estate LLC. All rights reserved. CENTURY 21 and the CENTURY 21 Logo are service marks owned by Century 21 Real Estate LLC. Century 21 Real Estate LLC fully supports the principles of the Fair Housing Act and the Equal Opportunity Act. Eachoffice is independently owned and operated.'
    },
    'Coldwell Banker': {
      logo: '/img/logos/logo-cb.svg',
      executive: {
        name: 'Ryan Gorman',
        title: 'President and Chief Executive Office',
        company: 'Coldwell Banker',
        signature: '/img/signatures/ryan-gorman.jpg'
      },
      icon: '/img/icons/fhp-icon-cb.svg',
      class: 'cb',
      disclaimer: '©2020 Coldwell Banker. All Rights Reserved. Coldwell Banker and the Coldwell Banker logos are trademarks of Coldwell Banker Real Estate LLC. The Coldwell Banker® System is comprised of company owned offices which are owned by a subsidiary of Realogy Brokerage Group LLC and franchised offices which are independently owned and operated. The Coldwell Banker System fully supports the principles of the Fair Housing Act and the Equal Opportunity Act.'
    },
    'Corcoran': {
      logo: '/img/logos/logo-corcoran.svg',
      executive: {
        name: 'Pamela Liebman',
        title: 'President and Chief Executive Officer',
        company: 'Corcoran',
        signature: '/img/signatures/pamela-liebman.jpg'
      },
      icon: '/img/icons/fhp-icon-corcoran.svg',
      class: 'corcoran',
      disclaimer: '©2020 Corcoran. All Rights Reserved. Corcoran and the Corcoran logo are trademarks of Corcoran Group LLC. The Corcoran® System is comprised of company-owned offices which are owned by a subsidiary of Realogy Brokerage Group LLC and franchised offices which are independently owned and operated. The Corcoran System fully supports the principles of the Fair Housing Act and the Equal Opportunity Act.'
    },
    'ERA': {
      logo: '/img/logos/logo-era.svg',
      executive: {
        name: 'Sherry A. Chris',
        title: 'President and Chief Executive Officer',
        company: 'Realogy Expansion Brands',
        signature: '/img/signatures/sherry-chris.jpg'
      },
      icon: '/img/icons/fhp-icon-era.svg',
      class: 'era',
      disclaimer: '© 2020 ERA Franchise System LLC. All Rights Reserved. ERA® and the ERA Logo are registered service marks owned by ERA Franchise Systems LLC. ERA Franchise Systems LLC fully supports the principles of the Fair Housing Act and the Equal Opportunity Act. Each office is independently owned and operated.'
    },
    'Realogy': {
      logo: '/img/logos/logo-realogy.svg',
      executive: {
        name: 'John Peyton',
        title: 'President and Chief Executive Officer',
        company: 'Realogy Franchise Group',
        signature: '/img/signatures/john-peyton.jpg'
      },
      icon: '/img/icons/fhp-icon-realogy.svg',
      class: 'realogy',
      disclaimer: '©2020 Realogy Holdings Corp. All Rights Reserved. Realogy Holdings Corp. fully supports the principles of the Fair Housing Act and the Equal Opportunity Act.'
    },
    'SIR': {
      logo: '/img/logos/logo-sir.svg',
      executive: {
        name: 'Philip A. White, Jr.',
        title: 'President and Chief Executive Officer',
        company: 'Sotheby’s International Realty',
        signature: '/img/signatures/philip-white.jpg'
      },
      icon: '/img/icons/fhp-icon-sir.svg',
      class: 'sir',
      disclaimer: '©2020 Sotheby\'s International Realty. All Rights Reserved. Sotheby\'s International Realty and the Sotheby\'s International Realty logo are trademarks licensed to Sotheby’s International Realty Affiliates LLC and used with permission. The Sotheby\'s International Realty® affiliate network is operated by Sotheby\'s International Realty Affiliates LLC, and the company owned brokerages are operated by Sotheby\'s International Realty, Inc. Both entities are subsidiaries of Realogy Holdings Corp. Both Sotheby\'s International Realty Affiliates LLC and Sotheby\'s International Realty, Inc. fully support the principles of the Fair Housing Act and the Equal Opportunity Act.'
    }
  }

  // Add brand certificate class
  body.classList.add(`certificate_${brands[brand].class}`)

  // Get today's date and setup month names
  const date = new Date()
  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

  // Generate certificate markup and append to DOM
  body.innerHTML = `<header class="certificate__header container pad">
    <img class="certificate__icon" src="/img/icons/house-and-hands.jpg" alt="House and hands">
  </header>
  <main class="certificate__main container pad">
    <h1 class="certificate__title">Certificate of Completion</h1>
    <p>is hereby granted to</p>
    <h2 class="certificate__name">${pledge.firstName} ${pledge.lastName}</h2>
    <p>to certify that they have completed to<br />
    satisfaction the Fair Housing Course.</p>
    <p>Granted ${monthNames[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}</p>
    <img class="certificate__signature" src="${brands[brand].executive.signature}" alt="${brands[brand].executive.name}">
    <p>${brands[brand].executive.name}<br />
    ${brands[brand].executive.title}<br />
    ${brands[brand].executive.company}</p>
    <img class="certificate__logo" src="${brands[brand].logo}" alt="${brand}">
  </main>
  <footer class="certificate__footer pad">
    <p class="certificate__disclaimer">${brands[brand].disclaimer}</p>
  </footer>`
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
    brand: brand,
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
  if (!event.target.matches('#pledge')) return false

  event.preventDefault()

  fetch('https://fairhousingpledge.com/api/pledges', {
    method: 'POST',
    body: JSON.stringify(serializeObject(event.target)),
    mode: 'cors'
  }).then(function (response) {
    if (response.ok) {
      return response.json()
    }
    return Promise.reject(response)
  }).then(function (data) {
    console.log('Pledge submission successfull.')
  }).catch(function (error) {
    console.warn('Pledge submission error.', error)
  }).finally(function () {
    event.target.submit()
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