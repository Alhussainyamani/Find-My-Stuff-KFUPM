document.addEventListener("DOMContentLoaded", () => {
    const sidebar = document.querySelector(".sidebar");
    const sidebarMenu = document.querySelector(".sidebar-menu");
    const loginButton = document.querySelector(".login-btn"); // Select the LOGIN button
    const detailButton = document.querySelector(".details-btn");

    detailButton.addEventListener("click", () => {
        window.location.href = "ReportDetailsGuest.html";
    });


    const itemId = new URLSearchParams(window.location.search).get("itemId"); // Get itemId from the URL

    // Ensure the itemId exists
    if (!itemId) {
        alert("Invalid request or missing itemId.");
        return;
    }

    fetch(`http://localhost:3000/api/items/${itemId}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json" // No Authorization header for guest users
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
    })
    .catch((error) => {
        console.error("Error fetching item details:", error);
        alert("Error fetching item details.");
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
