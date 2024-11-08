function toggleSidebar() {
  const sidebar = document.getElementById("sidebar");
  sidebar.classList.toggle("collapsed");

  // Adjust menu item visibility
  document.querySelectorAll(".menu-item").forEach((item) => {
    if (sidebar.classList.contains("collapsed")) {
      item.style.display = "none";
    } else {
      item.style.display = "block";
    }
  });
}

// Set the 'Home' menu item as active and remove the active class from 'Dashboard'
document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("nav-home").classList.add("active");
  document.getElementById("nav-dashboard").classList.remove("active");
});
