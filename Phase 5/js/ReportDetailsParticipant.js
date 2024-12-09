document.addEventListener("DOMContentLoaded", () => {
    const sidebar = document.querySelector(".sidebar");
    const sidebarMenu = document.querySelector(".sidebar-menu");

    const itemId = new URLSearchParams(window.location.search).get("itemId"); // Get itemId from the URL
    const token = localStorage.getItem("token");


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

        // Fill in the details on the page
        document.getElementById("reporter-name").textContent = data.createdBy.name || "Unknown"; 
        document.getElementById("report-date").textContent = new Date(data.createdAt).toLocaleDateString("en-GB"); // Format date
        document.getElementById("item-description").textContent = data.description || "No description provided";
        document.getElementById("item-location").textContent = data.location || "Unknown location";
        document.getElementById("item-photo").textContent = data.image ? "" : "No image available"; // Handle the image or text
        document.getElementById("report-status").textContent = data.status;

        // If there's an image URL, display it
        if (data.image) {
            const img = document.createElement("img");
            img.src = data.image;
            img.alt = "Item Image";
            img.classList.add("item-image");
            document.getElementById("item-photo").appendChild(img);
        }

        // Handle the "Add to bookmarks" button
        const addToBookmarksButton = document.getElementById("add-bookmarks-btn");
        addToBookmarksButton.addEventListener("click", () => {
            // Handle bookmarking logic here (e.g., save to localStorage or API)
            showPopupMessage("Report has been successfully added to bookmarks.");
        });

    })
    .catch((error) => {
        console.error("Error fetching item details:", error);
        alert("Error fetching item details.");
    });

    // Show success message in popup
    const popupOverlay = document.getElementById("popup-overlay");
    const closeButton = document.getElementById("close-btn");

    function showPopupMessage(message) {
        popupOverlay.style.display = "flex";
        popupOverlay.querySelector("h2").textContent = message;
    }

    closeButton.addEventListener("click", () => {
        popupOverlay.style.display = "none";
    });

    // Handle "Comments" button redirection
    const commentsButton = document.querySelector(".comments-go");
    commentsButton.addEventListener("click", () => {
        window.location.href = "CommentsParticipant.html"; // Redirect to Comments page
    });

    sidebarMenu.addEventListener("click", () => {
        sidebar.classList.toggle("sidebar-expanded");
    });

    // Redirect to profile page
    const profileIcon = document.querySelector(".profile-icon");
    profileIcon.addEventListener("click", () => {
        window.location.href = "ProfileParticipantPage.html";
    });

    // Redirect to notifications page
    const notificationIcon = document.querySelector(".notification-icon");
    notificationIcon.addEventListener("click", () => {
        window.location.href = "ParticipantNotifications.html";
    });
});
