document.addEventListener('DOMContentLoaded', function () {
  const counterElement = document.getElementById('counter');
  const careButton = document.getElementById('careButton');
  const successMessage = document.getElementById('successMessage');


  var apiUrl = API_URL ?? window.apiUrl;

  if (!window.apiUrl) {
    console.error('API URL is not defined');
    counterElement.textContent = 'N/A';
    return;
  }

  // Fetch initial count
  fetch(`${apiUrl}/count`)
    .then(response => response.json())
    .then(data => counterElement.textContent = data.count)
    .catch(error => {
      console.error('Error fetching count:', error);
      counterElement.textContent = 'Error loading counter';
    });

  careButton.addEventListener('click', function () {
    careButton.disabled = true; // Disable button immediately to prevent multiple clicks
    
    fetch(`${apiUrl}/increment`, { 
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => response.json())
    .then(data => {
      counterElement.textContent = data.count;
      successMessage.style.display = 'block';
    })
    .catch(error => {
      console.error('Error incrementing count:', error);
      careButton.disabled = false; // Re-enable button on error
      alert('Failed to register your support. Please try again.');
    });
  });
});
