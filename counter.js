document.addEventListener('DOMContentLoaded', function () {
  const counterElement = document.getElementById('counter');
  const careButton = document.getElementById('careButton');
  const successMessage = document.getElementById('successMessage');
  var apiUrl = import.meta.env.API_URL;


  // Check if API URL is defined
  if (!window.apiUrl) {
    console.error('API URL is not defined');
    counterElement.textContent = 'Error loading counter';
    return;
  }else{
    apiUrl = window.apiUrl;
  }

  
  // Fetch initial count
  fetch(`${apiUrl}/count`)
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
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
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
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