function init() {
  const form = document.forms.pledge

  form.addEventListener('submit', handleSubmit)
}

async function handleSubmit(e) {
  e.preventDefault()

  const form = document.forms.pledge
  const firstName = form.elements.firstName.value
  const lastName = form.elements.lastName.value
  const email = form.elements.email.value
  const state = form.elements.state[form.elements.state.selectedIndex].value
  const agreeToTerms = form.elements.agreeToTerms.checked

  const agent = {
    name: {
      first: firstName,
      last: lastName
    },
    email: email,
    state: state
  }

  console.log('agent: ', agent)

  fetch('/api/agents', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(agent),
  })
  // .then((response) => response.json())
  .then((data) => {
    console.log('Success:', data);
  })
  .catch((error) => {
    console.error('Error:', error);
  });
}

// init()