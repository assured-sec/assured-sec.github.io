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

  const formDataObj = Object.fromEntries(new FormData(form));
  console.log('Submitting text data:', formDataObj);

  try {
    const response = await fetch('https://script.google.com/macros/s/AKfycbwBPjbolESLzpXFwRAj232XrEh4sbt5216ih3jCP_MIQ5EWNuHPXSX_9I_ibHaGa3K_/exec', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formDataObj)
    });

    const result = await response.json();
    if (result.result === 'success') {
      console.log('Text fields submitted successfully');

      // Fade out form and show thank you screen
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
