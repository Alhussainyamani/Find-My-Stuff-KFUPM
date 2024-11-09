document.addEventListener("DOMContentLoaded", () => {
    const approveButton = document.querySelector(".approve-btn");
    const rejectButton = document.querySelector(".reject-btn");
    const confirmationOverlay = document.getElementById("confirmation-overlay");
    const popupOverlay = document.getElementById("popup-overlay");
    const confirmationText = document.getElementById("confirmation-text");
    const closeBtn = document.getElementById("close-btn");

    const yesButton = confirmationOverlay.querySelector(".yes-btn");
    const noButton = confirmationOverlay.querySelector(".no-btn");

    // Function to show the confirmation popup
    function showConfirmation(action) {
        confirmationText.textContent = `Are you sure you want to ${action}?`;
        confirmationOverlay.style.display = "flex"; // Show the confirmation overlay
    }

    // Function to hide the confirmation popup
    function hideConfirmation() {
        confirmationOverlay.style.display = "none"; // Hide the confirmation overlay
    }

    // Function to show the success overlay
    function showSuccessOverlay(message) {
        popupOverlay.querySelector("h2").textContent = message;
        popupOverlay.style.display = "flex"; // Show the success overlay
    }

    // Approve button event listener
    approveButton.addEventListener("click", () => {
        showConfirmation("approve");
        yesButton.onclick = () => {
            hideConfirmation();
            showSuccessOverlay("Report has been successfully approved!");
        };
    });

    // Reject button event listener
    rejectButton.addEventListener("click", () => {
        showConfirmation("reject");
        yesButton.onclick = () => {
            hideConfirmation();
            showSuccessOverlay("Report has been successfully rejected!");
        };
    });

    // No button action to close the confirmation popup
    noButton.addEventListener("click", hideConfirmation);

    // Close the success overlay when the Reports button is clicked
    closeBtn.addEventListener("click", () => {
        popupOverlay.style.display = "none";
        window.location.href = "AllReports.html"; 
    });

    const sidebar = document.querySelector(".sidebar");
    const sidebarMenu = document.querySelector(".sidebar-menu");
    const loginButton = document.querySelector(".login-btn"); // Select the LOGIN button

    // Toggle the sidebar expanded class when the menu button or sidebar is clicked
    sidebarMenu.addEventListener("click", () => {
        sidebar.classList.toggle("sidebar-expanded");
    });

    const profileIcon = document.querySelector(".profile-icon");
    profileIcon.addEventListener("click", () => {
        window.location.href = "ProfileAdmin.html";
    });

    // Redirect to ParticipantNotifications.html when the notification icon is clicked
    const notificationIcon = document.querySelector(".notification-icon");
    notificationIcon.addEventListener("click", () => {
        window.location.href = "AdminNotifications.html";
    });

    document.addEventListener("click", (event) => {
        if (event.target.classList.contains("details-btn")) {
            window.location.href = "AdminApprovedReport.html"; // Redirect to ReportDetailsGuest.html
        }
    });
});
