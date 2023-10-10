// Function to save favourite theme
function saveFavouriteTheme() {
  if (localStorage.getItem("darkMode") === "true") {
    localStorage.setItem("darkMode", "false");
  } else {
    localStorage.setItem("darkMode", "true");
  }
}

// Function to change website theme
function changeTheme() {
  // Extract theme button
  const themeButton = document.getElementById("theme-checkbox");

  // Detect theme change
  themeButton.addEventListener("click", function () {
    // Change theme
    body.classList.toggle("dark");
    sunIcon.classList.toggle("dark");
    moonIcon.classList.toggle("dark");
    // Save preference
    saveFavouriteTheme();
  });
}

// Function to detect article on viewport
function detectViewportArticle() {
  // Extract nav links
  const navLinks = document.querySelectorAll(".nav-link");
  // Extract article starting points
  const articleStartingPoints = document.querySelectorAll(
    ".article-starting-point"
  );

  // Save current article on viewport
  let currentArticleId = "home";

  window.addEventListener("scroll", function () {
    // Detect changes of current article on viewport
    articleStartingPoints.forEach((articleStartingPoint) => {
      if (window.scrollY >= articleStartingPoint.offsetTop) {
        currentArticleId = articleStartingPoint.id;
      }
    });

    // Style correspondent link
    navLinks.forEach((navLink) => {
      if (navLink.href.includes(currentArticleId)) {
        // Change style only when correspondent link is not active
        if (!navLink.classList.contains("active")) {
          document.querySelector(".nav-link.active").classList.remove("active");
          navLink.classList.add("active");
        }
      }
    });
  });
}

function filterProjects() {
  // Extract buttons
  const filterButtons = document.querySelectorAll(".filter");
  // Extract projects
  const projects = document.querySelectorAll(".project");

  // Save current filter
  let currentFilter = "all";

  //
  filterButtons.forEach((filterButton) => {
    //
    filterButton.addEventListener("click", function () {
      //
      if (!filterButton.classList.contains("active")) {
        document.querySelector(".filter.active").classList.remove("active");
        filterButton.classList.add("active");
        currentFilter = filterButton.id;
      }
      //
      projects.forEach((project) => {
        // Project part of filter
        if (project.getAttribute("project-category").includes(currentFilter)) {
          // Project is hidden
          if (project.classList.contains("hidden")) {
            project.classList.remove("hidden");
          }
        }
        // Project not part of filter
        else {
          // Project is visible
          if (!project.classList.contains("hidden")) {
            project.classList.add("hidden");
          }
        }
      });
    });
  });
}

changeTheme();
detectViewportArticle();
filterProjects();
