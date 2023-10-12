/* Function to save favourite theme */
function saveFavouriteTheme() {
  if (localStorage.getItem("darkMode") === "true") {
    localStorage.setItem("darkMode", "false");
  } else {
    localStorage.setItem("darkMode", "true");
  }
}

/* Function to change website theme */
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

/* Function to detect article on viewport */
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
      // Detect bottom of the webpage
      // Case: last article is not bigger enough
      if (
        window.innerHeight + Math.round(window.scrollY) >=
        document.body.offsetHeight
      ) {
        currentArticleId = "projects";
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

/* Function to filter projects */
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

/* Function to add the image of the project */
function addImage(projectImages, index, imageElement) {
  newSrc = "./assets/illustrations/" + projectImages[index] + ".svg";
  imageElement.setAttribute("src", newSrc);
}

/* Function to add the skills of the project */
function addSkills(projectSkills, index, skillsList) {
  // Compute number of skills for this project
  const numberOfSkills = projectSkills[index].length;

  // Loop to remove previous items
  while (skillsList.firstChild) {
    skillsList.removeChild(skillsList.firstChild);
  }
  // Add items
  for (let indexTwo = 0; indexTwo < numberOfSkills; indexTwo++) {
    let listItem = document.createElement("li");
    listItem.textContent = projectSkills[index][indexTwo];
    skillsList.appendChild(listItem);
  }
}

/* Function to show / hide and populate project modal */
function modalsController() {
  // Extract projects => open modals buttons
  const projects = document.querySelectorAll(".project");
  // Extract modal
  const modal = document.querySelector(".modal-container");
  // Extract close modal button
  const closeButton = document.querySelector(".close-button-container");
  // Compute number of projects
  const numberOfProjects = projects.length;

  /* Projects content */
  const projectImages = [
    "toyo",
    "personal-website",
    "front-end-projects",
    "ttt",
    "wc",
    "pem",
  ];
  const projectNames = [
    "Toyo Travel Companion",
    "Personal Website",
    "Front-End Projects",
    "Tic Tac Toe",
    "Wikipedia Crawler",
    "Pet Smart Manager",
  ];
  const projectDescriptions = ["lorem", "b", "c", "d", "e", "f"];
  const projectSkills = [
    [
      "HTML",
      "CSS",
      "JavaScript",
      "APIs",
      "Responsive Design",
      "Web Design",
      "Figma",
      "Python",
      "Flask",
      "SQL databases",
      "Algorithm Design",
      "Machine Learning",
    ],
    ["HTML", "CSS", "JavaScript", "Responsive Design", "Web Design", "Figma"],
    ["HTML", "CSS", "JavaScript", "Responsive Design"],
    ["Python", "Algorithm Design"],
    ["Python"],
    ["HTML", "CSS", "JavaScript", "Responsive Design", "PHP", "SQL databases"],
  ];
  const projectDates = [
    "February 2023 - June 2023",
    "October 2023",
    "August 2023 - Present",
    "November 2022 - December 2022",
    "December 2022 - January 2023",
    "March 2022 - June 2022",
  ];

  // Extract modal elements
  const imageElement = document.getElementById("modal-image");
  const nameElement = document.getElementById("modal-name");
  const descriptionElement = document.getElementById("modal-description");
  const skillsList = document.getElementById("modal-skills");
  const dateElement = document.getElementById("modal-date");

  // Detect which project was clicked, display modal, populate it, and hide it when button is clicked
  for (let index = 0; index < numberOfProjects; index++) {
    projects[index].addEventListener("click", function () {
      // Populate project
      addImage(projectImages, index, imageElement);
      nameElement.textContent = projectNames[index];
      descriptionElement.textContent = projectDescriptions[index];
      addSkills(projectSkills, index, skillsList);
      dateElement.textContent = projectDates[index];

      // Show modal
      modal.classList.add("active");
      // Hide body scrollbar
      body.classList.add("inactive");
    });
    //
    closeButton.addEventListener("click", function () {
      // Hide modal
      modal.classList.remove("active");
      // Show body scrollbar
      body.classList.remove("inactive");
    });
  }
}

function phoneMenuController() {
  // Extract hamburger menu
  const hamburgerMenu = document.getElementById("hamburger-menu");
  // Extract phone menu container
  const phoneMenu = document.querySelector(".phone-nav-container");
  // Extract close menu button
  const closeButton = document.getElementById("close-menu-button");
  // Extract phone menu links
  const menuLinks = document.querySelectorAll(".phone-nav-link");

  // Open phone menu
  hamburgerMenu.addEventListener("click", function () {
    phoneMenu.classList.add("active");
  });

  // Close phone menu when close button clicked
  closeButton.addEventListener("click", function () {
    phoneMenu.classList.remove("active");
  });

  // Close phone menu when link clicked
  menuLinks.forEach((menuLink) => {
    menuLink.addEventListener("click", function () {
      phoneMenu.classList.remove("active");
    });
  });
}

phoneMenuController();
changeTheme();
detectViewportArticle();
filterProjects();
modalsController();
