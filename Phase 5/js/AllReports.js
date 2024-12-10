document.addEventListener("DOMContentLoaded", () => {
    const sidebar = document.querySelector(".sidebar");
    const sidebarMenu = document.querySelector(".sidebar-menu");

    const token = localStorage.getItem("token"); // Get the token from localStorage

    if (!token) {
        alert("You need to be logged in to view the reports.");
        return;
    }

    // Fetch items based on admin role (approved/unapproved)
    fetch("http://localhost:3000/api/items?status=approved", {
        method: "GET",
        headers: {
            'Authorization': `Bearer ${token}`,
            "Content-Type": "application/json"
        }
    })
    .then((response) => response.json())
    .then((data) => {
        const approvedItems = data; // Items returned by this query are approved
        const approvedItemsContainer = document.querySelector(".myreports-found");

        // Handle approved items
        const approvedItemsMessage = approvedItemsContainer.querySelector(".no-items-message");
        if (approvedItems.length === 0) {
            approvedItemsMessage.style.display = "block"; // Show "no items" message if no approved items
        } else {
            approvedItemsMessage.style.display = "none"; // Hide message if there are approved items
            approvedItems.forEach(item => {
                const itemCard = createItemCard(item);
                approvedItemsContainer.appendChild(itemCard);
            });
        }
    })
    .catch((error) => {
        console.error("Error fetching approved items:", error);
    });

    // Fetch unapproved items separately
    fetch("http://localhost:3000/api/items?status=unapproved", {
        method: "GET",
        headers: {
            'Authorization': `Bearer ${token}`,
            "Content-Type": "application/json"
        }
    })
    .then((response) => response.json())
    .then((data) => {
        const unapprovedItems = data; // Items returned by this query are unapproved
        const unapprovedItemsContainer = document.querySelector(".myreports-lost");

        // Handle unapproved items
        const unapprovedItemsMessage = unapprovedItemsContainer.querySelector(".no-items-message");
        if (unapprovedItems.length === 0) {
            unapprovedItemsMessage.style.display = "block"; // Show "no items" message if no unapproved items
        } else {
            unapprovedItemsMessage.style.display = "none"; // Hide message if there are unapproved items
            unapprovedItems.forEach(item => {
                const itemCard = createItemCard(item);
                unapprovedItemsContainer.appendChild(itemCard);
            });
        }
    })
    .catch((error) => {
        console.error("Error fetching unapproved items:", error);
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
            // Redirect based on item approval status
            if (item.approviness === "approved") {
                window.location.href = `AdminApprovedReport.html?itemId=${item._id}`;
            } else {
                window.location.href = `AdminUnApprovedReport.html?itemId=${item._id}`;
            }
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
        window.location.href = "ProfileAdmin.html";
    });

    // Redirect to notifications page
    const notificationIcon = document.querySelector(".notification-icon");
    notificationIcon.addEventListener("click", () => {
        window.location.href = "AdminNotifications.html";
    });
});
