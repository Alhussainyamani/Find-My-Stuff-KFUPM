document.addEventListener("DOMContentLoaded", () => {
  // Ensure the sidebar starts in a collapsed state on page load
  const sidebar = document.getElementById("sidebar");
  const mainContent = document.querySelector(".main-content");

  // Adjust the main content margin for the collapsed state
  if (sidebar.classList.contains("collapsed")) {
    mainContent.style.marginLeft = "60px";
  }

  // Set the 'Home' menu item as active and remove the active class from 'Dashboard'
  const homeItem = document.getElementById("nav-home");
  const dashboardItem = document.getElementById("nav-dashboard");
  if (homeItem && dashboardItem) {
    homeItem.classList.add("active");
    dashboardItem.classList.remove("active");
  }
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

