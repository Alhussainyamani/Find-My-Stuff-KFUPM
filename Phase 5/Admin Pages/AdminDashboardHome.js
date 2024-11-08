document.addEventListener("DOMContentLoaded", () => {
  // Ensure the sidebar starts in a collapsed state on page load
  const sidebar = document.getElementById("sidebar");
  const mainContent = document.querySelector(".main-content");

  // Adjust the main content margin for the collapsed state
  if (sidebar.classList.contains("collapsed")) {
    mainContent.style.marginLeft = "60px";
  }

  // Highlight the 'Home' menu item and ensure 'Dashboard' is not active
  const homeItem = document.querySelector(".menu-item:nth-child(1)"); // Adjust selector if needed
  const dashboardItem = document.querySelector(".menu-item:nth-child(2)"); // Adjust selector if needed

  if (homeItem && dashboardItem) {
    homeItem.classList.add("active"); // Highlight 'Home' menu item
    dashboardItem.classList.remove("active"); // Remove highlight from 'Dashboard'
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
