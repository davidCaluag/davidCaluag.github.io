document.addEventListener('DOMContentLoaded', function() {
  // Cache DOM elements
  const loadingScreen = document.getElementById("loading-screen");
  const content = document.getElementById("content");
  const counterElement = document.getElementById('counter');
  const careButton = document.getElementById('careButton');
  const successMessage = document.getElementById('successMessage');
  
  // Only proceed if the elements exist
  if (!counterElement || !careButton || !successMessage) return;
  
  // Initially set the counter
  counterElement.textContent = 'Loading...';

  // Check localStorage for previous interaction
  const hasInteracted = localStorage.getItem("careButtonDisabled") === "true";
  
  if (hasInteracted) {
    careButton.disabled = true;
    successMessage.style.display = 'block';
  }

  // If "Cool" was set in localStorage, display timestamp of interaction
  if (localStorage.getItem("Cool") === "true") {
    const timestamp = localStorage.getItem("interactionTime") || new Date().toISOString();
    successMessage.textContent += " Interaction recorded at: " + timestamp;
  }

  // Try to get initial count if API is available
  getCounter().catch(error => {
    console.error('Could not fetch initial count', error);
    counterElement.textContent = '0'; // Fallback value
  });

  // Show content after loading screen
  showContent();

  // Register click event for the care button
  careButton.addEventListener('click', handleCareButtonClick);
});

// Separated functions for better maintainability
async function getCounter() {
  try {
    const response = await fetch(`${myApi}/count`);
    const counterElement = document.getElementById('counter');
    
    if (response.ok) {
      const data = await response.json();
      counterElement.textContent = data.count;
    } else {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
  } catch (error) {
    console.error('Error fetching count', error);
    const counterElement = document.getElementById('counter');
    if (counterElement) counterElement.textContent = 'Error! API :(';
    throw error; // Rethrow to allow caller to handle
  }
}
// Function to hide the loading screen and show the main content
function showContent() {
  const loadingScreen = document.getElementById("loading-screen");
  const content = document.getElementById("content");

  // Hide loading screen and show content
  loadingScreen.style.display = "none";
  content.style.display = "block";
}; const myApi = "https://bunsofiedeeba.up.railway.app";

async function handleCareButtonClick() {
  const careButton = document.getElementById('careButton');
  const counterElement = document.getElementById('counter');
  const successMessage = document.getElementById('successMessage');
  
  console.log("Button clicked!");
  careButton.disabled = true; // Prevent multiple clicks
  
  try {
    const response = await fetch(`${myApi}/increment`, { 
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({})
    });
    
    if (response.ok) {
      const data = await response.json();
      counterElement.textContent = data.count;
      successMessage.style.display = 'block';
      
      // Save state and timestamp in localStorage
      const timestamp = new Date().toISOString();
      localStorage.setItem("careButtonDisabled", "true");
      localStorage.setItem("Cool", "true");
      localStorage.setItem("interactionTime", timestamp);
      
      console.log("Successfully sent.");
    } else {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
  } catch (error) {
    console.error('Error incrementing count', error);
    careButton.disabled = false; // Re-enable button on error
    alert('Failed to register. Try tomorrow and tell me it ain\'t workin.');
  }
}

