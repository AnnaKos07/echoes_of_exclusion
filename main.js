function redirectToSliderPage() {
  // Redirect to the slider page
  window.location.href = "slider_page.html"; // Change "slider_page.html" to the actual URL of your slider page
}

// Container
let container = document.querySelector("#container");

// Select the image
let img = document.querySelector("#img");

// Number of images
let numOfImages = 7;

// Window size
let windowWidth = window.innerWidth;
let windowHeight = window.innerHeight;

// Divide the screen
let screenSection = windowWidth / numOfImages;

// Touch positions
let touchStartX, touchEndX;

// Events for touch start and move
container.addEventListener("touchstart", touchStartFn);
container.addEventListener("touchmove", touchMoveFn);

function touchStartFn(event) {
    touchStartX = event.touches[0].clientX;
}

function touchMoveFn(event) {
    touchEndX = event.touches[0].clientX;
    const swipeDistance = touchEndX - touchStartX;
    const direction = swipeDistance > 0 ? 1 : -1; // 1 for right swipe, -1 for left swipe
    const sectionNumber = findImageSection(touchEndX, screenSection);
    const newImgIndex = (sectionNumber - 1 + direction + numOfImages) % numOfImages + 1;
    img.src = `img/${newImgIndex}.JPG`;
}

// Function to find the section of the image
function findImageSection(touchEndX, screenSection) {
    for (let i = 1; i <= numOfImages; i++) {
        if (touchEndX < screenSection * i) {
            return i;
        }
    }
    return numOfImages; // If the touch end position is beyond the last section, return the last section
}