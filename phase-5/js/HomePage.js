document.addEventListener("DOMContentLoaded", () => {
    const sidebar = document.querySelector(".sidebar");
    const sidebarMenu = document.querySelector(".sidebar-menu");
    const searchButton = document.querySelector(".search-btn");
    const lostButton = document.querySelector(".report-lost-btn");
    const foundButton = document.querySelector(".report-found-btn"); 
    
    document.addEventListener("click", (event) => {
        if (event.target.classList.contains("details-btn")) {
            window.location.href = "ParticipantReportDetails.html"; // Redirect to ParticipantReportDetails.html
        }
    });
     

    // Toggle the sidebar expanded class when the menu button or sidebar is clicked
    sidebarMenu.addEventListener("click", () => {
        sidebar.classList.toggle("sidebar-expanded");
    });

    
    // Redirect to the SearchPageParticipant.html when the Search button is clicked
    searchButton.addEventListener("click", () => {
        window.location.href = "SearchPageParticipant.html"; 
    });

    // Redirect to the ReportLostItem.html when the Report Lost Item button is clicked
    lostButton.addEventListener("click", () => {
        window.location.href = "ReportLostItem.html"; 
    });

    // Redirect to the ReportFoundItem.html when the Report Found Item button is clicked
    foundButton.addEventListener("click", () => {
        window.location.href = "ReportFoundItem.html"; 
    });

    const profileIcon = document.querySelector(".profile-icon");
    profileIcon.addEventListener("click", () => {
        window.location.href = "ProfileParticipantPage.html";
    });

    // Redirect to ParticipantNotifications.html when the notification icon is clicked
    const notificationIcon = document.querySelector(".notification-icon");
    notificationIcon.addEventListener("click", () => {
        window.location.href = "ParticipantNotifications.html";
    });
});
