document.addEventListener("DOMContentLoaded", () => {
    const searchButton = document.querySelector(".search-btn");
    const searchInput = document.querySelector(".search-bar input");
    const itemsBox = document.querySelector(".search-results");
    

    document.addEventListener("click", (event) => {
        if (event.target.classList.contains("details-btn")) {
            window.location.href = "AdminApprovedReport.html";
        }
    });
    
    // Create container, message, and image elements
    const noItemsContainer = document.createElement("div");
    const noItemsMessage = document.createElement("p");
    const sadFaceImage = document.createElement("img");

    // Set up the sad face image
    sadFaceImage.src = "assets/images/sadface.png";
    sadFaceImage.alt = "Sad Face";
    sadFaceImage.classList.add("small-sadface");
    sadFaceImage.style.display = "none"; // Initially hidden

    // Configure no items container
    noItemsContainer.classList.add("no-items-container"); // Add class for CSS styling
    noItemsContainer.style.display = "none"; // Initially hidden
    noItemsMessage.style.color = "red";
    noItemsMessage.style.fontWeight = "bold";

    // Append message and image to the container
    noItemsContainer.appendChild(noItemsMessage);
    noItemsContainer.appendChild(sadFaceImage);

    // Insert container above the items box
    itemsBox.parentNode.insertBefore(noItemsContainer, itemsBox);

    // Hide items box initially
    itemsBox.style.display = "none";

    // Function to display items with original design
    function displayItems(numberOfItems) {
        itemsBox.style.display = "block"; // Show items box
        itemsBox.innerHTML = ""; // Clear previous items
        noItemsContainer.style.display = "none"; // Hide no items message and image

        for (let i = 1; i <= numberOfItems; i++) {
            const itemCard = document.createElement("div");
            itemCard.className = "item-card";
            itemCard.innerHTML = `
                <div class="card-left">
                    <p><strong>Item ${i}</strong></p>
                    <p class="item-date">Information about the Item</p>
                </div>
                <div class="card-right">
                    <button class="details-btn">Details</button>
                </div>
            `;
            itemsBox.appendChild(itemCard);
        }
    }

    // Function to perform search
    function performSearch() {
        const query = searchInput.value.trim().toLowerCase();

        itemsBox.style.display = "none"; // Hide items box initially
        itemsBox.innerHTML = ""; // Clear items
        noItemsMessage.textContent = ""; // Clear message
        sadFaceImage.style.display = "none"; // Hide sad face image
        noItemsContainer.style.display = "none"; // Hide container initially

        if (query === "key") {
            // Display 4 items if the search term is 'key'
            displayItems(4);
        } else if (query === "wallet") {
            // Show no items message and sad face for 'wallet'
            noItemsMessage.textContent = "There are no items match what you are searching for.";
            sadFaceImage.style.display = "block"; // Display sad face image
            noItemsContainer.style.display = "flex"; // Show container with message and image
        } else {
            // Display default "no items found" message
            noItemsMessage.textContent = "No items found for your search.";
            sadFaceImage.style.display = "block"; // Display sad face image
            noItemsContainer.style.display = "flex";
        }
    }

    // Attach event listener to the search button
    searchButton.addEventListener("click", performSearch);

    // Sidebar functionality
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

    // Redirect to AdminNotifications.html when the notification icon is clicked
    const notificationIcon = document.querySelector(".notification-icon");
    notificationIcon.addEventListener("click", () => {
        window.location.href = "AdminNotifications.html";
    });
});
