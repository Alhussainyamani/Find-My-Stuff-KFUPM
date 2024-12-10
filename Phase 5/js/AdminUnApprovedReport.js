document.addEventListener("DOMContentLoaded", () => {
    const approveButton = document.querySelector(".approve-btn");
    const rejectButton = document.querySelector(".reject-btn");
    const confirmationOverlay = document.getElementById("confirmation-overlay");
    const popupOverlay = document.getElementById("popup-overlay");
    const confirmationText = document.getElementById("confirmation-text");
    const closeBtn = document.getElementById("close-btn");
    const yesButton = confirmationOverlay.querySelector(".yes-btn");
    const noButton = confirmationOverlay.querySelector(".no-btn");

    const itemId = new URLSearchParams(window.location.search).get("itemId"); // Get itemId from URL
    const token = localStorage.getItem("token");

    const sidebar = document.querySelector(".sidebar");
    const sidebarMenu = document.querySelector(".sidebar-menu");

    // Ensure the itemId and token exist
    if (!itemId || !token) {
        alert("Invalid request or missing token.");
        return;
    }

    // Fetch the item details using the itemId
    fetch(`http://localhost:3000/api/items/${itemId}`, {
        method: "GET",
        headers: {
            'Authorization': `Bearer ${token}`,
            "Content-Type": "application/json"
        }
    })
    .then((response) => response.json())
    .then((data) => {
        if (!data) {
            alert("Item not found.");
            return;
        }

        // Populate the page with the fetched details
        document.getElementById("reporter-name").textContent = data.createdBy.name || "Unknown"; 
        document.getElementById("report-date").textContent = new Date(data.createdAt).toLocaleDateString("en-GB");
        document.getElementById("item-description").textContent = data.description || "No description provided";
        document.getElementById("item-location").textContent = data.location || "Unknown location";
        document.getElementById("report-status").textContent = data.approviness || "Not approved";

        // Handle item photo
        const photoContainer = document.getElementById("item-photo");
        if (data.imageUrl) {
            const img = document.createElement("img");
            img.src = data.imageUrl;
            img.alt = "Item Image";
            img.classList.add("item-image");
            photoContainer.appendChild(img);
        } else {
            photoContainer.textContent = "No image available.";
        }
    })
    .catch((error) => {
        console.error("Error fetching item details:", error);
        alert("Error fetching item details.");
    });

    // Function to show the confirmation popup
    function showConfirmation(action) {
        confirmationText.textContent = `Are you sure you want to ${action} this item?`;
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
            // Approve the item on the backend
            fetch(`http://localhost:3000/api/items/${itemId}/approve`, {
                method: "PUT",
                headers: {
                    'Authorization': `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            })
            .then(response => response.json())
            .then(data => {
                hideConfirmation();
                showSuccessOverlay("Report has been successfully approved!");
            })
            .catch(error => {
                console.error("Error approving item:", error);
                alert("Error approving item.");
            });
        };
    });

    // Reject button event listener
    rejectButton.addEventListener("click", () => {
        showConfirmation("reject");
        yesButton.onclick = () => {
            // Delete the item on the backend
            fetch(`http://localhost:3000/api/items/${itemId}/delete`, {
                method: "PUT",
                headers: {
                    'Authorization': `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            })
            .then(response => response.json())
            .then(data => {
                hideConfirmation();
                showSuccessOverlay("Report has been successfully rejected!");
            })
            .catch(error => {
                console.error("Error rejecting item:", error);
                alert("Error rejecting item.");
            });
        };
    });

    // No button action to close the confirmation popup
    noButton.addEventListener("click", hideConfirmation);

    // Close the success overlay when the "Reports" button is clicked
    closeBtn.addEventListener("click", () => {
        popupOverlay.style.display = "none";
        window.location.href = "AllReports.html"; // Redirect to reports page
    });

    sidebarMenu.addEventListener("click", () => {
        sidebar.classList.toggle("sidebar-expanded");
    });

    // Redirect to profile page
    const profileIcon = document.querySelector(".profile-icon");
    profileIcon.addEventListener("click", () => {
        window.location.href = "ProfileAdmin.html";
    });

    // Redirect to notifications page
    const notificationIcon = document.querySelector(".notification-icon");
    notificationIcon.addEventListener("click", () => {
        window.location.href = "AdminNotifications.html";
    });
});
