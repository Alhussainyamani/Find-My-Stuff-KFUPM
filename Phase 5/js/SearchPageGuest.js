document.addEventListener("DOMContentLoaded", () => {
    const searchButton = document.querySelector(".search-btn");
    const searchInput = document.querySelector(".search-bar input");
    const itemsBox = document.querySelector(".search-results");
    const loginButton = document.querySelector(".login-btn");

    // Create container, message, and image elements for no items
    const noItemsContainer = document.createElement("div");
    const noItemsMessage = document.createElement("p");
    const sadFaceImage = document.createElement("img");

    sadFaceImage.src = "assets/images/sadface.png";
    sadFaceImage.alt = "Sad Face";
    sadFaceImage.classList.add("small-sadface");
    sadFaceImage.style.display = "none"; // Initially hidden

    noItemsContainer.classList.add("no-items-container");
    noItemsContainer.style.display = "none"; // Initially hidden
    noItemsMessage.style.color = "red";
    noItemsMessage.style.fontWeight = "bold";

    noItemsContainer.appendChild(noItemsMessage);
    noItemsContainer.appendChild(sadFaceImage);
    itemsBox.parentNode.insertBefore(noItemsContainer, itemsBox);
    itemsBox.style.display = "none"; // Initially hidden

    // Function to display items from the backend
    function displayItems(items) {
        itemsBox.style.display = "block";
        itemsBox.innerHTML = ""; // Clear previous items
        noItemsContainer.style.display = "none"; // Hide no items message

        if (items.length === 0) {
            noItemsMessage.textContent = "No items found for your search.";
            sadFaceImage.style.display = "block"; // Display sad face image
            noItemsContainer.style.display = "flex";
            return;
        }

        items.forEach(item => {
            console.log("Item:", item); // Log item to check if _id exists
            const itemCard = document.createElement("div");
            itemCard.className = "item-card";
            itemCard.innerHTML = `
                <div class="card-left">
                    <p><strong>${item.information}</strong></p>
                    <p class="item-date">${new Date(item.createdAt).toLocaleDateString('en-GB') || 'No description available'}</p>
                </div>
                <div class="card-right">
                    <button class="details-btn" data-id="${item._id}">Details</button>
                </div>
            `;
            itemsBox.appendChild(itemCard);

            // Ensure the item._id exists before adding the event listener
            const detailsBtn = itemCard.querySelector(".details-btn");
            if (item._id) {
                detailsBtn.addEventListener("click", () => {
                    window.location.href = `ReportDetailsGuest.html?itemId=${item._id}`;
                });
            } else {
                console.error("Error: item._id is missing for item:", item);
                detailsBtn.disabled = true; // Disable button if no _id
            }
        });
    }

    // Function to perform search
    function performSearch() {
        const query = searchInput.value.trim().toLowerCase();

        itemsBox.style.display = "none";
        itemsBox.innerHTML = "";
        noItemsMessage.textContent = "";
        sadFaceImage.style.display = "none";
        noItemsContainer.style.display = "none";

        if (query) {
            fetchItems(query);
        }
    }

    // Fetch items from the backend
    function fetchItems(query) {
        fetch(`http://localhost:3000/api/items/guest?status=approved&search=${query}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(response => response.json())
        .then(data => {
            displayItems(data); // Display fetched items
        })
        .catch(error => {
            console.error("Error fetching items:", error);
            noItemsMessage.textContent = "Error fetching items.";
            sadFaceImage.style.display = "block";
            noItemsContainer.style.display = "flex";
        });
    }

    searchButton.addEventListener("click", performSearch);

    const sidebar = document.querySelector(".sidebar");
    const sidebarMenu = document.querySelector(".sidebar-menu");

    sidebarMenu.addEventListener("click", () => {
        sidebar.classList.toggle("sidebar-expanded");
    });

    loginButton.addEventListener("click", () => {
        window.location.href = "Login.html";
    });
});
