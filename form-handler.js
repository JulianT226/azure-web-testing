document.getElementById('passportForm').addEventListener('submit', async function(e) {
  e.preventDefault();
  const formData = new FormData(this);
  const response = await fetch('/process-form', {
    method: 'POST',
    body: formData,
  });
  const result = await response.json();
  console.log(result);
});