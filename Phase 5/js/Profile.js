
// (in a real scenario, you'd check if there are bookmarks)
// So if there's no bookmarks a message will be displayed instead of the list.

document.addEventListener("DOMContentLoaded", () => {
    // Sidebar toggle functionality
    const sidebar = document.querySelector(".sidebar");
    const sidebarMenu = document.querySelector(".sidebar-menu");

    sidebarMenu.addEventListener("click", () => {
        sidebar.classList.toggle("sidebar-expanded");
    });

    // Set Name and Email dynamically
    document.getElementById("name").textContent = "Waleed Alrajhi";
    document.getElementById("email").textContent = "s202176730@kfupm.edu.sa";

    // Sidebar links functionality
    document.querySelector(".profile-icon").addEventListener("click", () => {
        window.location.href = "ProfileParticipantPage.html";
    });

    document.querySelector(".notification-icon").addEventListener("click", () => {
        window.location.href = "ParticipantNotifications.html";
    });

    document.getElementById("name").textContent = "Waleed Alrajhi";
    document.getElementById("email").textContent = "s202176730@kfupm.edu.sa";

    // Create 10 example bookmarks
    const bookmarks = Array.from({ length: 10 }, (_, index) => ({
        title: `Bookmark Item ${index + 1}`,
        description: `Information about Bookmark Item ${index + 1}`,
    }));

    const bookmarksList = document.querySelector(".bookmarks-list");

    // Create and append each bookmark item
    bookmarks.forEach(bookmark => {
        const itemCard = document.createElement("div");
        itemCard.className = "item-card";
        itemCard.innerHTML = `
            <div class="card-left">
                <p><strong>${bookmark.title}</strong></p>
                <p class="item-date">${bookmark.description}</p>
            </div>
            <div class="card-right">
                <button class="details-btn">Details</button>
            </div>
        `;
        bookmarksList.appendChild(itemCard);
    });

    // Event listener for the Details button
    document.addEventListener("click", (event) => {
        if (event.target.classList.contains("details-btn")) {
            window.location.href = "ReportParticipantDetails.html"; // Redirect to details page
        }
    });
});

  
