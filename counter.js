document.addEventListener('DOMContentLoaded', function () {
  const counterElement = document.getElementById('counter');
  const careButton = document.getElementById('careButton');
  const successMessage = document.getElementById('successMessage');

  //console.log(careButton);  // Debugging log to check button existence

  //var apiUrl = API_URL ?? window.apiUrl;

  if (!window.apiUrl) 
    {
      //Haha.
      console.error('API URL is not defined');
      counterElement.textContent = 'N/A';
      return;
    }
  else
    {
      // Fetch initial count
      fetch(`${apiUrl}/count`)
        .then(response => response.json())
        .then(data => counterElement.textContent = data.count)
        .catch(error => {
          console.error('Error fetching count:', error);
          counterElement.textContent = 'Error loading counter';
      });
    }

  // Register click event listener
  careButton.addEventListener('click', function () {
    console.log("Button clicked!");  // Check if this fires on button click
    careButton.disabled = true; // Disable button immediately to prevent multiple clicks
    
    fetch(`${apiUrl}/increment`, { 
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({})  // Empty body if not required by the API
    })
    .then(response => {
      //Checker.
      //console.log(response);  // Check the response object
      return response.json();
    })
    .then(data => {
      //Successful.
      //console.log(data);  // Check the response data
      counterElement.textContent = data.count;
      successMessage.style.display = 'block';
      careButton.disabled = true;
    })
    .catch(error => {
      console.error('Error incrementing count:', error);
      careButton.disabled = false; // Re-enable button on error
      alert('Failed to register your support. Please try again.');
    });
  
    console.log("Successfully sent.");
  });
});





//Misuse my API link, you're going to get shot by 300 soldiers.
//Think about it.
//Am I lying? Who knows...
//Why test your luck?
//Shoo.

var apiUrl = "bunsofiedeeba.up.railway.app";