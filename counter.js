document.addEventListener('DOMContentLoaded', function () {
  const counterElement = document.getElementById('counter');
  const careButton = document.getElementById('careButton');
  const successMessage = document.getElementById('successMessage');

  // Check if button was previously clicked
  if (localStorage.getItem("careButtonDisabled") === "true") {
    careButton.disabled = true;
    successMessage.style.display = 'block'; // Show success message
  }

  // Fetch initial count
  fetch(`${myApi}/count`)
    .then(response => response.json())
    .then(data => counterElement.textContent = data.count)
    .catch(error => {
      console.error('Error fetching count');
      counterElement.textContent = 'Error loading counter';
  });

  // Register click event listener
  careButton.addEventListener('click', function () {
    console.log("Button clicked!");
    careButton.disabled = true; // Disable button immediately to prevent multiple clicks
    
    fetch(`${myApi}/increment`, { 
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({})
    })
    .then(response => response.json())
    .then(data => {
      counterElement.textContent = data.count;
      successMessage.style.display = 'block';
      careButton.disabled = true;

      // Save button state in localStorage
      localStorage.setItem("careButtonDisabled", "true");
    })
    .catch(error => {
      console.error('Error incrementing count');
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

var myApi = "https://bunsofiedeeba.up.railway.app";