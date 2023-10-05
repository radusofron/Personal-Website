// Function to save favourite theme
function setFavouriteTheme() {
  if (localStorage.getItem("darkMode") === "true") {
    localStorage.setItem("darkMode", "false");
  } else {
    localStorage.setItem("darkMode", "true");
  }
}

// Extract theme button
const themeButton = document.getElementById("theme-checkbox");

// Detect theme change
themeButton.addEventListener("click", function () {
  // Change theme
  body.classList.toggle("dark");
  sunIcon.classList.toggle("dark");
  moonIcon.classList.toggle("dark");
  // Save preference
  setFavouriteTheme();
});
