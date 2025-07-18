document.addEventListener('DOMContentLoaded', () => {
  const urlParams = new URLSearchParams(window.location.search);
  const projectNumber = urlParams.get('project');
  if (projectNumber) {
    document.getElementById('projectNumber').value = projectNumber;
    console.log('Project number set from URL:', projectNumber);
  }
});

document.getElementById('preInstallForm').addEventListener('submit', async function(event) {
  event.preventDefault();

  const form = this;
  const submitButton = form.querySelector('button[type="submit"]');
  const thankYouScreen = document.getElementById('thankYouScreen');

  submitButton.classList.add('loading');

  const formData = new FormData(form);

  // Convert FormData to URL-encoded string
  const urlEncodedData = new URLSearchParams(formData).toString();

  try {
    const response = await fetch('https://script.google.com/macros/s/AKfycbzsMai18oub2DjUfBkLbynI1_qe8m643XGVbyznNsXRK72PDNpDyRjjESxOLJIjTNX_/exec', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: urlEncodedData
    });

    const result = await response.json();
    if (result.result === 'success') {
      console.log('Form submitted successfully');

      form.style.transition = 'opacity 0.5s ease';
      form.style.opacity = '0';
      setTimeout(() => {
        form.style.display = 'none';
        thankYouScreen.classList.add('active');
      }, 500);
    } else {
      throw new Error('Form submission failed');
    }
  } catch (error) {
    console.error('Error submitting form:', error);
    alert('An error occurred: ' + error.message);
  } finally {
    submitButton.classList.remove('loading');
  }
});
