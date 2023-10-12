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
  // Extract header
  const headerElement = document.getElementById("header");
  // Extract article starting points
  const articles = document.querySelectorAll(".article");

  // Save current article on viewport
  let currentArticleId = "home";

  window.addEventListener("scroll", function () {
    // Compute header height
    let headerHeight = headerElement.offsetHeight;
    // Compute distance
    let distance = window.scrollY + headerHeight;
    // Detect changes of current article on viewport and determine starting position
    articles.forEach((article) => {
      if (distance >= article.offsetTop) {
        currentArticleId = article.id;
        article.style.cssText = `scroll-margin-top: ${headerHeight}px;`;
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

  filterButtons.forEach((filterButton) => {
    // Style selected filter
    filterButton.addEventListener("click", function () {
      if (!filterButton.classList.contains("active")) {
        document.querySelector(".filter.active").classList.remove("active");
        filterButton.classList.add("active");
        currentFilter = filterButton.id;
      }
      // Style projects accordingly to selected filter
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

/* Function to add links of the project */
function addLinks(projectLinks, index, linksElements) {
  demoHref = projectLinks[index][0];
  githubHref = projectLinks[index][1];
  // Demo
  if (demoHref === "false") {
    if (!linksElements[0].classList.contains("inactive")) {
      linksElements[0].classList.add("inactive");
      linksElements[0].removeAttribute("href");
    }
  } else {
    if (linksElements[0].classList.contains("inactive")) {
      linksElements[0].classList.remove("inactive");
    }
    linksElements[0].setAttribute("href", demoHref);
  }
  // GitHub
  if (githubHref === "false") {
    if (!linksElements[1].classList.contains("inactive")) {
      linksElements[1].classList.add("inactive");
      linksElements[1].removeAttribute("href");
    }
  } else {
    if (linksElements[1].classList.contains("inactive")) {
      linksElements[1].classList.remove("inactive");
    }
    linksElements[1].setAttribute("href", githubHref);
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
  const projectDescriptions = [
    "<p>Toyo Travel Companion represents my bachelor's degree project. It is an interactive web application created to help tourists organize their city trips efficiently. </p> <p> The available options regarding a city are to generate travel itineraries based on the preferences of the user, such as the number of days to be spent, and tourist attractions to be visited, to read the description from Wikipedia, to view relevant photos from Unsplash, to examine some statistics (derived from the evaluations of the users), to see the reviews written by other users (contains a sorting system), to find the latest news, and to check the weather forecast. </p> <p> Every city can be marked as visited or bookmarked by the users. Once a destination is marked as visited, users can evaluate it and leave reviews for it. </p> <p> Also, users can see some statistics about their travel activity and manage their travel itineraries, profiles, and accounts. </p>",
    "<p>This project is the website you're exploring right now.</p>",
    "<p>This is not a stand-alone project, but a collection of solved small Front-End projects created based on the designs provided by Frontend Mentor and iCodeThis websites. </p> <p> Visit correspondent GitHub repository to see all of these small Front-End projects in detail. Some of them are hosted. </p>",
    "<p>As its name suggests, this is a clasic game of Tic Tac Toe with options for single-player matches at different difficulty levels and multiplayer mode for interactive play. For medium and hard difficulties, I have used Minmax algrotihm.</p>",
    "<p>This project is a crawler that extracts the data from any Wikipedia page provided via a link and computes statistics with it. The results are saved in a file, and users have the option to choose whether the crawler should take prepositions into account or not.</p>",
    "<p>This web application, created during my second year as a student, provides users a platform to manage resources related to their pets.</p>",
  ];
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
  const projectLinks = [
    ["https://youtu.be/YLdVbMWkYKw", "https://github.com/radusofron/Licenta"],
    ["false", "https://github.com/radusofron/Personal-Website"],
    ["false", "https://github.com/radusofron/Front-End-projects"],
    ["false", "false"],
    ["false", "false"],
    ["false", "https://github.com/radu781/Pet-Smart-Manager"],
  ];

  // Extract modal elements
  const imageElement = document.getElementById("modal-image");
  const nameElement = document.getElementById("modal-name");
  const descriptionElement = document.getElementById("modal-description");
  const skillsList = document.getElementById("modal-skills");
  const dateElement = document.getElementById("modal-date");
  const linksElements = document.querySelectorAll(".project-link");

  // Detect which project was clicked, display modal, populate it, and hide it when button is clicked
  for (let index = 0; index < numberOfProjects; index++) {
    projects[index].addEventListener("click", function () {
      // Only for available projects
      if (!projects[index].classList.contains("hidden")) {
        // Populate project
        addImage(projectImages, index, imageElement);
        nameElement.textContent = projectNames[index];
        descriptionElement.innerHTML = projectDescriptions[index];
        addSkills(projectSkills, index, skillsList);
        dateElement.textContent = projectDates[index];
        addLinks(projectLinks, index, linksElements);

        // Show modal
        modal.classList.add("active");
        // Hide body scrollbar
        body.classList.add("inactive");
      }
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
    body.classList.add("inactive");
  });

  // Close phone menu when close button clicked
  closeButton.addEventListener("click", function () {
    phoneMenu.classList.remove("active");
    body.classList.remove("inactive");
  });

  // Close phone menu when link clicked
  menuLinks.forEach((menuLink) => {
    menuLink.addEventListener("click", function () {
      phoneMenu.classList.remove("active");
      body.classList.remove("inactive");
    });
  });
}

phoneMenuController();
changeTheme();
detectViewportArticle();
filterProjects();
modalsController();
