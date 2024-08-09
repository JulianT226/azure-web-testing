document.getElementById('passportForm').addEventListener('submit', async function(e) {
  e.preventDefault(); // Prevent the default form submission
  
  const formData = new FormData(this);
  
  try {
    const response = await fetch('/process-form', {
      method: 'POST',
      body: formData,
    });

    if (response.ok) {
      const result = await response.json();
      alert('Form submitted successfully!');
      console.log(result);
    } else {
      alert('Form submission failed.');
      console.error('Error:', response.statusText);
    }
  } catch (error) {
    alert('There was an error submitting the form.');
    console.error('Error:', error);
  }
});