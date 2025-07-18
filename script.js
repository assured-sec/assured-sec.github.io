
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

document.getElementById('preInstallForm').addEventListener('submit', async function(event) {
  event.preventDefault();

  const form = this;
  const submitButton = form.querySelector('button[type="submit"]');
  const thankYouScreen = document.getElementById('thankYouScreen');

  submitButton.classList.add('loading');

  // Prepare text data
  const formDataObj = Object.fromEntries(new FormData(form));
  console.log('Text data being sent:', formDataObj);

  try {
    // First POST text fields as JSON
    const textResponse = await fetch('https://script.google.com/macros/s/AKfycbynZdPqN8zdXof0tzR3IpMgcSxsYP1CNeVtxefsw1pl0g2hlQT1tXUqhiS3z0CI59bC/exec', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type: 'text', ...formDataObj })
    });
    const textResult = await textResponse.json();
    if (textResult.result !== 'success') throw new Error('Text submission failed');

    console.log('Text fields submitted successfully');

    // Prepare file upload (if any files)
    const fileInputs = form.querySelectorAll('input[type="file"]');
    let hasFiles = false;
    const fileFormData = new FormData();
    fileFormData.append('projectNumber', formDataObj.projectNumber);

    fileInputs.forEach(input => {
      if (input.files.length > 0) {
        hasFiles = true;
        for (let file of input.files) {
          fileFormData.append(input.name, file);
        }
      }
    });

    if (hasFiles) {
      console.log('Uploading files...');
      const fileResponse = await fetch('https://script.google.com/macros/s/AKfycbynZdPqN8zdXof0tzR3IpMgcSxsYP1CNeVtxefsw1pl0g2hlQT1tXUqhiS3z0CI59bC/exec', {
        method: 'POST',
        body: fileFormData
      });
      const fileResult = await fileResponse.json();
      if (fileResult.result !== 'success') throw new Error('File upload failed');

      console.log('Files uploaded successfully');
    } else {
      console.log('No files to upload.');
    }

    // Fade out form and show thank you screen
    form.style.transition = 'opacity 0.5s ease';
    form.style.opacity = '0';
    setTimeout(() => {
      form.style.display = 'none';
      thankYouScreen.classList.add('active');
    }, 500);

  } catch (error) {
    console.error('Error!', error.message);
    alert('An error occurred: ' + error.message);
  } finally {
    submitButton.classList.remove('loading');
  }
});
