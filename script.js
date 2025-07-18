document.addEventListener('DOMContentLoaded', () => {
  const urlParams = new URLSearchParams(window.location.search);
  const projectNumber = urlParams.get('project');
  if (projectNumber) {
    document.getElementById('projectNumber').value = projectNumber;
    console.log('Project number set from URL:', projectNumber);
  }
});


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

  const form = this;
  const submitButton = form.querySelector('button[type="submit"]');
  const thankYouScreen = document.getElementById('thankYouScreen');

  // Add spinner inside submit button
  submitButton.classList.add('loading');

  console.log('Project Number being sent:', document.getElementById('projectNumber').value);

  const data = Object.fromEntries(new FormData(form));
  data.projectNumber = document.getElementById('projectNumber').value;

  fetch('https://script.google.com/macros/s/AKfycbwfmiSEY6zqrv7IudL1k0jkd91ethbR21BEY82nnyd6fE0zrh9mchmGOJ-T129Oodwi/exec', {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then(response => response.json())
  .then(data => {
    if (data.result === 'success') {
      form.style.transition = 'opacity 0.5s ease';
      form.style.opacity = '0';
      // Show thank you screen after fade
      setTimeout(() => {
        form.style.display = 'none';
        thankYouScreen.classList.add('active');
      }, 500);
    } else {
      alert('Form submission failed. Please try again.');
    }
  })
  .catch(error => {
    console.error('Error!', error.message);
    alert('An error occurred while submitting the form.');
  })
  .finally(() => {
    // Remove spinner from submit button
    submitButton.classList.remove('loading');
  });
});
