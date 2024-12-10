document.addEventListener("DOMContentLoaded", () => {
    // Sample points data
    const totalPoints = 322;
    const pointsEarnedThisMonth = 16;

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
          document.getElementById("total-points").textContent = user.points;
        })
        .catch(error => {
          console.error(error);
          alert("Error fetching profile data");
        });
      };

      fetchUserProfile();

    // Redeem button and input
    const redeemInput = document.getElementById("redeem-points");
    const redeemButton = document.getElementById("redeem-btn");
    const redeemError = document.getElementById("redeem-error");

    redeemButton.addEventListener("click", () => {
        const redeemValue = parseInt(redeemInput.value);

        // Validation
        if (isNaN(redeemValue) || redeemValue <= 0) {
            redeemError.textContent = "Please enter a valid number of points.";
            redeemError.style.display = "block";
        } else if (redeemValue > totalPoints) {
            redeemError.textContent = "You cannot redeem more points than your total points.";
            redeemError.style.display = "block";
        } else {
            redeemError.style.display = "none";
            // Show success popup
            document.getElementById("popup-overlay").style.display = "flex";
        }
    });

    // Redirect to home page when clicking on the Home button in the popup
    document.getElementById("home-btn").addEventListener("click", () => {
        window.location.href = "HomePage.html";
    });

    const sidebar = document.querySelector(".sidebar");
    const sidebarMenu = document.querySelector(".sidebar-menu");
    sidebarMenu.addEventListener("click", () => {
        sidebar.classList.toggle("sidebar-expanded");
    });


    const profileIcon = document.querySelector(".profile-icon");
    profileIcon.addEventListener("click", () => {
        window.location.href = "ProfileParticipantPage.html";
    });

    // Redirect to ParticipantNotifications.html when the notification icon is clicked
    const notificationIcon = document.querySelector(".notification-icon");
    notificationIcon.addEventListener("click", () => {
        window.location.href = "ParticipantNotifications.html";
    });
});
