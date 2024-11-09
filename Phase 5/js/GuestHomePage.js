document.addEventListener("DOMContentLoaded", () => {
    const sidebar = document.querySelector(".sidebar");
    const sidebarMenu = document.querySelector(".sidebar-menu");
    const loginButton = document.querySelector(".login-btn"); // Select the LOGIN button
    const searchButton = document.querySelector(".search-btn"); // Select the Search button
    
    document.addEventListener("click", (event) => {
        if (event.target.classList.contains("details-btn")) {
            window.location.href = "ReportDetailsGuest.html"; // Redirect to ReportDetailsGuest.html
        }
    });

    // Toggle the sidebar expanded class when the menu button or sidebar is clicked
    sidebarMenu.addEventListener("click", () => {
        sidebar.classList.toggle("sidebar-expanded");
    });

    // Redirect to the Login page when the LOGIN button is clicked
    loginButton.addEventListener("click", () => {
        window.location.href = "Login.html";
    });

    // Redirect to the SearchPageGuest.html when the Search button is clicked
    searchButton.addEventListener("click", () => {
        window.location.href = "SearchPageGuest.html";
    });
});
