document.addEventListener("DOMContentLoaded", () => {
    const sidebar = document.querySelector(".sidebar");
    const sidebarMenu = document.querySelector(".sidebar-menu");
     
    // Toggle the sidebar expanded class when the menu button or sidebar is clicked
    sidebarMenu.addEventListener("click", () => {
        sidebar.classList.toggle("sidebar-expanded");
    });
    const profileIcon = document.querySelector(".profile-icon");
    profileIcon.addEventListener("click", () => {
        window.location.href = "ProfileAdmin.html";
    });

    // Redirect to AdminNotifications.html when the notification icon is clicked
    const notificationIcon = document.querySelector(".notification-icon");
    notificationIcon.addEventListener("click", () => {
        window.location.href = "AdminNotifications.html";
    });
});
