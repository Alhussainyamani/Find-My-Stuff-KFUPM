document.addEventListener("DOMContentLoaded", () => {
  const sidebar = document.getElementById("sidebar");
  const mainContent = document.querySelector(".main-content");

  // Ensure the sidebar starts in a collapsed state if needed
  if (sidebar.classList.contains("collapsed")) {
    mainContent.style.marginLeft = "60px";
  } else {
    mainContent.style.marginLeft = "200px";
  }

  // Set the active class based on the current page
  const currentPage = window.location.pathname.split("/").pop();
  const pageToNavId = {
    "AdminHome.html": "nav-home",
    "AdminDashboard.html": "nav-dashboard",
    "Reports.html": "nav-reports",
  };

  document.querySelectorAll(".menu-item").forEach((item) => {
    item.classList.remove("active");
  });

  const activeNavId = pageToNavId[currentPage];
  if (activeNavId) {
    document.getElementById(activeNavId)?.classList.add("active");
  }

  // Add click event listeners to sidebar items for dynamic active state updates
  document.querySelectorAll(".menu-item a").forEach((link) => {
    link.addEventListener("click", () => {
      document.querySelectorAll(".menu-item").forEach((item) => {
        item.classList.remove("active");
      });
      link.parentElement.classList.add("active");
    });
  });
});

// Function to toggle the sidebar
function toggleSidebar() {
  const sidebar = document.getElementById("sidebar");
  sidebar.classList.toggle("collapsed");

  // Adjust menu item visibility
  document.querySelectorAll(".menu-item").forEach((item) => {
    item.style.display = sidebar.classList.contains("collapsed")
      ? "none"
      : "block";
  });

  // Adjust main content margin
  const mainContent = document.querySelector(".main-content");
  mainContent.style.marginLeft = sidebar.classList.contains("collapsed")
    ? "60px"
    : "200px";
}
