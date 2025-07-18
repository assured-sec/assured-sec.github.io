// Get the project number from URL and set it in the hidden field
const urlParams = new URLSearchParams(window.location.search);
const projectNumber = urlParams.get('project');
if (projectNumber) {
  document.getElementById('projectNumber').value = projectNumber;
}

function addContact(containerId, type) {
  const container = document.getElementById(containerId);
  const count = container.querySelectorAll('.entry-group').length + 1;
  const entry = document.createElement('div');
  entry.classList.add('entry-group');
  entry.innerHTML = `
    <label for="${type}Name${count}">Name</label>
    <input type="text" id="${type}Name${count}" name="${type}Name${count}" required>
    <label for="${type}Phone${count}">Phone</label>
    <input type="tel" id="${type}Phone${count}" name="${type}Phone${count}" required>
    <label for="${type}Email${count}">Email</label>
    <input type="email" id="${type}Email${count}" name="${type}Email${count}" required>
  `;
  container.appendChild(entry);
}

document.getElementById('preInstallForm').addEventListener('submit', function(event) {
  event.preventDefault();

  // Disable submit button and show feedback
  const submitButton = this.querySelector('button[type="submit"]');
  submitButton.disabled = true;
  submitButton.textContent = 'Submitting...';

  // Optional: add a visible status message
  let statusMessage = document.createElement('p');
  statusMessage.textContent = 'Submitting your form, please wait...';
  statusMessage.style.color = '#333';
  statusMessage.style.fontWeight = 'bold';
  this.appendChild(statusMessage);

  const formData = new FormData(this);

  fetch('https://script.google.com/macros/s/AKfycbwfmiSEY6zqrv7IudL1k0jkd91ethbR21BEY82nnyd6fE0zrh9mchmGOJ-T129Oodwi/exec', {
    method: 'POST',
    body: formData
  })
  .then(response => response.json())
  .then(data => {
    if (data.result === 'success') {
      statusMessage.textContent = 'Form submitted successfully!';
      statusMessage.style.color = 'green';
    } else {
      statusMessage.textContent = 'Form submission failed. Please try again.';
      statusMessage.style.color = 'red';
    }
  })
  .catch(error => {
    console.error('Error!', error.message);
    statusMessage.textContent = 'An error occurred while submitting the form.';
    statusMessage.style.color = 'red';
  })
  .finally(() => {
    // Re-enable the submit button
    submitButton.disabled = false;
    submitButton.textContent = 'Submit';
  });
});

