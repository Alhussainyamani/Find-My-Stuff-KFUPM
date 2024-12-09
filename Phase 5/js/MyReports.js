document.addEventListener("DOMContentLoaded", () => {
    const sidebar = document.querySelector(".sidebar");
    const sidebarMenu = document.querySelector(".sidebar-menu");

    const token = localStorage.getItem("token"); // Get the token from localStorage

    if (!token) {
        alert("You need to be logged in to view your reports.");
        return;
    }

    // Fetch items based on user role (admin or regular user)
    fetch("http://localhost:3000/api/items", {
        method: "GET",
        headers: {
            'Authorization': `Bearer ${token}`,
            "Content-Type": "application/json"
        }
    })
    .then((response) => response.json())
    .then((data) => {
        const lostItems = data.filter(item => item.type === "lost");
        const foundItems = data.filter(item => item.type === "found");

        const lostItemsContainer = document.querySelector(".myreports-lost");
        const foundItemsContainer = document.querySelector(".myreports-found");

        // Handle lost items
        const lostItemsMessage = lostItemsContainer.querySelector(".no-items-message");
        if (lostItems.length === 0) {
            lostItemsMessage.style.display = "block"; // Show "no items" message if no lost items
        } else {
            lostItemsMessage.style.display = "none"; // Hide message if there are lost items
            lostItems.forEach(item => {
                const itemCard = createItemCard(item);
                lostItemsContainer.appendChild(itemCard);
            });
        }

        // Handle found items
        const foundItemsMessage = foundItemsContainer.querySelector(".no-items-message");
        if (foundItems.length === 0) {
            foundItemsMessage.style.display = "block"; // Show "no items" message if no found items
        } else {
            foundItemsMessage.style.display = "none"; // Hide message if there are found items
            foundItems.forEach(item => {
                const itemCard = createItemCard(item);
                foundItemsContainer.appendChild(itemCard);
            });
        }
    })
    .catch((error) => {
        console.error("Error fetching items:", error);
    });

    // Function to create an item card
    function createItemCard(item) {
        const card = document.createElement("div");
        card.classList.add("item-card");

        const cardLeft = document.createElement("div");
        cardLeft.classList.add("card-left");
        const itemName = document.createElement("p");
        itemName.textContent = item.information || "Unnamed Item";
        const itemDate = document.createElement("p");
        itemDate.classList.add("item-date");
        const formattedDate = new Date(item.createdAt).toLocaleDateString('en-GB'); // Using en-GB format, which outputs "DD/MM/YYYY"
        itemDate.textContent = `Date: ${formattedDate || "Unknown"}`;
        cardLeft.appendChild(itemName);
        cardLeft.appendChild(itemDate);

        const cardRight = document.createElement("div");
        cardRight.classList.add("card-right");
        const detailsBtn = document.createElement("button");
        detailsBtn.classList.add("details-btn");
        detailsBtn.textContent = "Details";
        detailsBtn.addEventListener("click", () => {
            window.location.href = `ParticipantReportDetails.html?itemId=${item._id}`;
        });
        cardRight.appendChild(detailsBtn);

        card.appendChild(cardLeft);
        card.appendChild(cardRight);

        return card;
    }

    // Handle Sidebar menu toggle
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
