document.addEventListener("DOMContentLoaded", () => {
    const sidebar = document.querySelector(".sidebar");
    const sidebarMenu = document.querySelector(".sidebar-menu");

    // Add event listener for details buttons
    document.addEventListener("click", (event) => {
        if (event.target.classList.contains("details-btn")) {
            const parentSection = event.target.closest(".myreports-lost, .myreports-found");
            if (parentSection.classList.contains("myreports-lost")) {
                window.location.href = "AdminUnApprovedReport.html"; // Redirect to AdminUnApprovedReport.html
            } else if (parentSection.classList.contains("myreports-found")) {
                window.location.href = "AdminApprovedReport.html"; // Redirect to AdminApprovedReport.html
            }
        }
    });

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
