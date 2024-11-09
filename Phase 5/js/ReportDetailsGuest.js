document.addEventListener("DOMContentLoaded", () => {
    const sidebar = document.querySelector(".sidebar");
    const sidebarMenu = document.querySelector(".sidebar-menu");
    const loginButton = document.querySelector(".login-btn"); // Select the LOGIN button
    const detailButton = document.querySelector(".details-btn");

    detailButton.addEventListener("click", () => {
        window.location.href = "ReportDetailsGuest.html";
    });

    // Toggle the sidebar expanded class when the menu button or sidebar is clicked
    sidebarMenu.addEventListener("click", () => {
        sidebar.classList.toggle("sidebar-expanded");
    });

    // Redirect to the Login page when the LOGIN button is clicked
    loginButton.addEventListener("click", () => {
        window.location.href = "Login.html"; 
    });
});
