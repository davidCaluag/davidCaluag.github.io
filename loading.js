function loadLoadingScreen() {
    const loadingScreen = document.getElementById("loading-screen");
    const content = document.getElementById("main-content");

    function showContent() {
        loadingScreen.style.display = "none";
        content.style.display = "block";
    }

    setTimeout(function() {
        loadingScreen.style.opacity = '0';
        content.style.opacity = '1';
        
        // Remove loading screen from DOM after transition
        setTimeout(function() {
            showContent();
        }, 250);
    }, 250); // Adjust time based on your needs
}

document.addEventListener('DOMContentLoaded', loadLoadingScreen);