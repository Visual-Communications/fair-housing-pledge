function init() {

  const form = document.forms[0]

  form.addEventListener('submit', handleSubmit)
}

async function handleSubmit(e) {
  e.preventDefault()

  const firstName = document.getElementById('firstName').value
  const lastName = document.getElementById('lastName').value
  const email = document.getElementById('email').value
  const state = document.getElementById('state').value
  const agreeToTerms = document.getElementById('agreeToTerms').checked

  const agent = {
    name: {
      first: firstName,
      last: lastName
    },
    email: email,
    state: state,
    agreeToTerms: agreeToTerms
  }

  const response = await fetch('/api/agents', { method: 'post' }, agent)
    .then(function(response) { console.log(response) })

  console.log(response)
}

init()



// Example POST method implementation:
async function postData(url = '', data = {}) {
  // Default options are marked with *
  const response = await fetch(url, {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json'
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: 'follow', // manual, *follow, error
    referrerPolicy: 'no-referrer', // no-referrer, *client
    body: JSON.stringify(data) // body data type must match "Content-Type" header
  });
  return await response.json(); // parses JSON response into native JavaScript objects
}

postData('https://example.com/answer', { answer: 42 })
  .then((data) => {
    console.log(data); // JSON data parsed by `response.json()` call
  });