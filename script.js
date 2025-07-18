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
  const formData = new FormData(this);
  fetch('https://script.google.com/macros/s/AKfycbwfmiSEY6zqrv7IudL1k0jkd91ethbR21BEY82nnyd6fE0zrh9mchmGOJ-T129Oodwi/exec', {
    method: 'POST',
    body: formData
  })
  .then(response => response.json())
  .then(data => {
    if (data.result === 'success') {
      alert('Form submitted successfully!');
    } else {
      alert('Form submission failed.');
    }
  })
  .catch(error => {
    console.error('Error!', error.message);
    alert('An error occurred while submitting the form.');
  });
});
