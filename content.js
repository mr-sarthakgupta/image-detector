// content.js

// Function to add overlay to an image
function addOverlayToImage(image) {
  var overlay = document.createElement('div');
  overlay.style.position = 'absolute';
  overlay.style.top = 0;
  overlay.style.left = 0;
  overlay.style.width = '100%';
  overlay.style.height = '100%';
  overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.7)'; // Opaque black background
  overlay.style.pointerEvents = 'none'; // Allow clicking through the overlay
  overlay.style.zIndex = '9999'; // Set a high z-index to ensure it's above the image
  overlay.innerText = 'This is an image';
  overlay.style.color = 'white'; // Set text color to white

  image.parentElement.appendChild(overlay);
}

// Automatically add overlay to all images on page load
document.addEventListener('DOMContentLoaded', function () {
  var images = document.querySelectorAll('img');
  images.forEach(function (image) {
    addOverlayToImage(image);
  });
});
