document.addEventListener("DOMContentLoaded", () => {
    const notificationsContainer = document.querySelector(".notifications-results");
  
    // Sample notifications with 10 entries
    const notifications = [
      { title: "Notification 1", date: "Just now", description: "Your item has been found!" },
      { title: "Notification 2", date: "5 mins ago", description: "New message from Admin." },
      { title: "Notification 3", date: "10 mins ago", description: "Your report has been updated." },
      { title: "Notification 4", date: "20 mins ago", description: "System maintenance scheduled." },
      { title: "Notification 5", date: "1 hour ago", description: "New items have been added." },
      { title: "Notification 6", date: "2 hours ago", description: "Item found: Black wallet." },
      { title: "Notification 7", date: "Yesterday", description: "Reminder: Check lost and found items." },
      { title: "Notification 8", date: "Yesterday", description: "Report status updated." },
      { title: "Notification 9", date: "2 days ago", description: "Your item has been claimed!" },
      { title: "Notification 10", date: "3 days ago", description: "Profile updated successfully." }
    ];
  
    // Function to create a notification card
    function createNotificationCard(notification) {
      const notificationCard = document.createElement("div");
      notificationCard.classList.add("item-card");
  
      // Title and date container
      const titleContainer = document.createElement("div");
      titleContainer.classList.add("card-title-date");
  
      const title = document.createElement("p");
      title.textContent = notification.title;
      title.classList.add("notification-title");
  
      const date = document.createElement("p");
      date.classList.add("notification-date");
      date.textContent = notification.date;
  
      titleContainer.appendChild(title);
      titleContainer.appendChild(date);
  
      // Description in the center
      const description = document.createElement("p");
      description.classList.add("notification-description");
      description.textContent = notification.description;
  
      // Add elements to the notification card
      notificationCard.appendChild(titleContainer);
      notificationCard.appendChild(description);
  
      return notificationCard;
    }
  
    // Add each notification to the container
    notifications.forEach(notification => {
      const notificationCard = createNotificationCard(notification);
      notificationsContainer.appendChild(notificationCard);
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
  