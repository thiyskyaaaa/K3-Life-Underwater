const splashScreen = document.querySelector('.splash-screen');

setTimeout(() => {
  splashScreen.style.opacity = 0;
  splashScreen.style.transition = 'opacity 0.5s ease-in-out';
  setTimeout(() => {
    window.location.href = "homepage.html"; // Replace with your actual home page URL
  }, 500) // Additional delay after fading out before redirecting
}, 4000); // Delay before hiding splash screen (4 seconds)
