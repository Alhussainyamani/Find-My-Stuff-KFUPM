document.addEventListener("DOMContentLoaded", () => {
  const sidebar = document.getElementById("sidebar");
  const mainContent = document.querySelector(".main-content");

  // Adjust the main content margin for the collapsed state
  if (sidebar.classList.contains("collapsed")) {
    mainContent.style.marginLeft = "60px";
  } else {
    mainContent.style.marginLeft = "200px";
  }

  // Get the current page filename and map it to navigation IDs
  const currentPage = window.location.pathname.split("/").pop();
  const pageToNavId = {
    "AdminDashboardHome.html": "nav-home",
    "AdminDashboard.html": "nav-dashboard",
    "Reports.html": "nav-reports",
  };

  // Set the active class on the current page's navigation item
  document.querySelectorAll(".menu-item").forEach((item) => {
    item.classList.remove("active");
  });
  const activeNavId = pageToNavId[currentPage];
  if (activeNavId) {
    document.getElementById(activeNavId)?.classList.add("active");
  }

  // Event listeners for sidebar links to set active state
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

  // Adjust main content margin
  const mainContent = document.querySelector(".main-content");
  mainContent.style.marginLeft = sidebar.classList.contains("collapsed")
    ? "60px"
    : "200px";
}
