document.addEventListener("DOMContentLoaded", () => {
    const itemId = getItemIdFromURL(); // Assuming you have the item ID in the URL
    const token = localStorage.getItem("token");

    const sidebar = document.querySelector(".sidebar");
    const sidebarMenu = document.querySelector(".sidebar-menu");

    // Helper function to get the item ID from the URL (assuming it's in the URL)
    function getItemIdFromURL() {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get("itemId"); // Or adjust as per your URL structure
    }

    // Ensure the itemId and token exist
    if (!itemId || !token) {
        alert("Invalid request or missing token.");
        return;
    }

    // Fetch item details from the backend
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
            // Make a POST request to add the item to bookmarks
            fetch("http://localhost:3000/api/auth/bookmarks", {
                method: "POST",
                headers: {
                    'Authorization': `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ itemId: itemId })
            })
            .then((response) => response.json())
            .then((data) => {
                if (data.message === "Item added to bookmarks successfully") {
                    // Show the success message in the popup
                    showPopupMessage(data.message);
                }  else if (data.message === "Item is already bookmarked") {
                    // Handle item already bookmarked
                    alert("This item is already bookmarked.");
                } else {
                    // Handle unexpected responses
                    alert("Unexpected error occurred while adding to bookmarks.");
                }
            })
            .catch((error) => {
                console.error("Error adding item to bookmarks:", error);
                alert("Error adding item to bookmarks.");
            });
        });

    })
    .catch((error) => {
        console.error("Error fetching item details:", error);
        alert("Error fetching item details.");
    });

    const popupOverlay = document.getElementById("popup-overlay");
    function showPopupMessage(message) {
        popupOverlay.style.display = "flex";
        popupOverlay.querySelector("h2").textContent = message;
    }

    // Fetch Comments Button (Navigates to comments page for this specific item)
    const commentsButton = document.querySelector(".comments-go");
    commentsButton.addEventListener("click", () => {
        window.location.href = `CommentsAdmin.html?itemId=${itemId}`; // Navigate to the comments page for this item
    });

    // Delete Button Event (Triggers Delete Confirmation)
    const deleteButton = document.querySelector(".delete-btn");
    deleteButton.addEventListener("click", () => {
        document.getElementById("confirmation-overlay").style.display = "flex";
    });

    // Handle the Confirm Delete Button
    const confirmDeleteBtn = document.getElementById("confirm-delete");
    confirmDeleteBtn.addEventListener("click", () => {
        fetch(`http://localhost:3000/api/items/${itemId}/delete`, {
            method: "PUT",
            headers: {
                'Authorization': `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        })
        .then(response => response.json())
        .then(data => {
            document.getElementById("confirmation-overlay").style.display = "none";
            document.getElementById("delete-success-overlay").style.display = "flex";
        })
        .catch(error => {
            console.error("Error deleting item:", error);
            alert("Error deleting item.");
        });
    });

    // Handle the Cancel Delete Button
    const cancelDeleteBtn = document.getElementById("cancel-delete");
    cancelDeleteBtn.addEventListener("click", () => {
        document.getElementById("confirmation-overlay").style.display = "none";
    });

    const closeButton = document.getElementById("close-btn");
    closeButton.addEventListener("click", () => {
        popupOverlay.style.display = "none";
    });

    // Handle Close Delete Success Button
    const backToReportsBtn = document.getElementById("close-delete-success-btn");
    backToReportsBtn.addEventListener("click", () => {
        window.location.href = "AllReports.html"; // Or wherever your reports list is
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