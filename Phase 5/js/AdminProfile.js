document.addEventListener("DOMContentLoaded", () => {
    // Function to fetch user profile data
    const fetchUserProfile = () => {
      const token = localStorage.getItem("token"); // Assuming token is stored in localStorage
      fetch("http://localhost:3000/api/auth/profile", {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      })
      .then(response => {
        if (!response.ok) {
          throw new Error("Failed to fetch profile");
        }
        return response.json();
      })
      .then(data => {
        const user = data.user;
  
        // Set Name and Email dynamically
        document.getElementById("name").textContent = user.name;
        document.getElementById("email").textContent = user.email;
  
        // Fetch bookmarks (ItemIds)
        if (user.bookmarks && user.bookmarks.length > 0) {
          fetchBookmarkedItems(user.bookmarks);
        } else {
          // Show a message if no bookmarks
          document.querySelector(".bookmarks-list").innerHTML = "<p>No bookmarks available.</p>";
        }
      })
      .catch(error => {
        console.error(error);
        alert("Error fetching profile data");
      });
    };
  
    // Function to fetch bookmarked items
    const fetchBookmarkedItems = (bookmarkIds) => {
      const token = localStorage.getItem("token"); // Assuming token is stored in localStorage
      fetch("http://localhost:3000/api/items", {
        method: "GET",
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      })
      .then(response => {
        if (!response.ok) {
          throw new Error("Failed to fetch items");
        }
        return response.json();
      })
      .then(items => {
        // Filter out items that match the bookmark IDs
        const bookmarkedItems = items.filter(item => bookmarkIds.includes(item._id));
  
        // Display the bookmarked items
        const bookmarksList = document.querySelector(".bookmarks-list");
        if (bookmarkedItems.length > 0) {
          bookmarksList.innerHTML = ''; // Clear any existing content
          bookmarkedItems.forEach(item => {
            const itemCard = document.createElement("div");
            itemCard.className = "item-card";
            itemCard.innerHTML = `
              <div class="card-left">
                  <p><strong>${item.information}</strong></p>
                  <p class="item-date">${new Date(item.createdAt).toLocaleDateString("en-GB")}</p>
              </div>
              <div class="card-right">
                  <button class="details-btn" data-item-id="${item._id}">Details</button>
              </div>
            `;
            bookmarksList.appendChild(itemCard);
          });
  
          // Event listener for the Details button
          document.querySelectorAll(".details-btn").forEach(button => {
            button.addEventListener("click", (event) => {
              const itemId = event.target.getAttribute("data-item-id");
              window.location.href = `AdminApprovedReport.html?itemId=${itemId}`; // Redirect to item details page
            });
          });
        } else {
          bookmarksList.innerHTML = "<p>No bookmarks found.</p>";
        }
      })
      .catch(error => {
        console.error(error);
        alert("Error fetching bookmarked items");
      });
    };
  
    // Initialize the profile page by fetching user profile
    fetchUserProfile();
  
    // Sidebar toggle functionality
    const sidebar = document.querySelector(".sidebar");
    const sidebarMenu = document.querySelector(".sidebar-menu");
  
    sidebarMenu.addEventListener("click", () => {
      sidebar.classList.toggle("sidebar-expanded");
    });
  
    // Sidebar links functionality
    document.querySelector(".profile-icon").addEventListener("click", () => {
      window.location.href = "ProfileAdmin.html";
    });
  
    document.querySelector(".notification-icon").addEventListener("click", () => {
      window.location.href = "AdminNotifications.html";
    });
  });
  