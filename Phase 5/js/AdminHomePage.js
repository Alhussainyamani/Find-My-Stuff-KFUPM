document.addEventListener("DOMContentLoaded", () => {
    const sidebar = document.querySelector(".sidebar");
    const sidebarMenu = document.querySelector(".sidebar-menu");
    const searchButton = document.querySelector(".search-btn");
    const lostButton = document.querySelector(".report-lost-btn");
    const foundButton = document.querySelector(".report-found-btn"); 
    
    document.addEventListener("click", (event) => {
        if (event.target.classList.contains("details-btn")) {
            window.location.href = "AdminApprovedReport.html";
        }
    });
     

    // Toggle the sidebar expanded class when the menu button or sidebar is clicked
    sidebarMenu.addEventListener("click", () => {
        sidebar.classList.toggle("sidebar-expanded");
    });

    
    // Redirect to the SearchPageAdmin.html when the Search button is clicked
    searchButton.addEventListener("click", () => {
        window.location.href = "SearchPageAdmin.html"; 
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
