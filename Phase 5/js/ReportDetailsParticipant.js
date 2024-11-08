document.addEventListener("DOMContentLoaded", () => {
    // Get references to the buttons
    const addToBookmarksButton = document.querySelector(".add-bookmarks");
    const commentsButton = document.querySelector(".comments-go");
    const popupOverlay = document.getElementById("popup-overlay");
    const closeButton = document.getElementById("close-btn");

    // Function to show the popup with a specific message
    function showPopupMessage(message) {
        popupOverlay.style.display = "flex"; // Display the popup overlay
        popupOverlay.querySelector("h2").textContent = message; // Set the message
    }

    // Function to hide the popup
    function hidePopupMessage() {
        popupOverlay.style.display = "none"; // Hide the popup overlay
    }

    // Event listener for "Add to bookmarks" button
    addToBookmarksButton.addEventListener("click", () => {
        if (!addToBookmarksButton.disabled) {
            showPopupMessage("Report has been successfully added to bookmarks.");
            addToBookmarksButton.disabled = true; // Disable the button after clicking
            addToBookmarksButton.textContent = "Bookmarked"; // Change the button text
            addToBookmarksButton.classList.add("disabled-bookmark"); // Add a class for disabled style
        } else {
            // Show a different message if the button is clicked again
            showPopupMessage("This report is already bookmarked.");
        }
    });

    // Event listener for "Close" button in popup
    closeButton.addEventListener("click", () => {
        hidePopupMessage(); // Hide the popup
    });



    // Event listener for "Comments" button
    commentsButton.addEventListener("click", () => {
        window.location.href = "Comments.html"; // Redirect to Comments.html
    });

    const sidebar = document.querySelector(".sidebar");
    const sidebarMenu = document.querySelector(".sidebar-menu");
    sidebarMenu.addEventListener("click", () => {
        sidebar.classList.toggle("sidebar-expanded");
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
