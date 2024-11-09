document.addEventListener("DOMContentLoaded", () => {
    const notificationsContainer = document.querySelector(".notifications-results");
  
    // Sample notifications with 10 entries
    const notifications = [
      { title: "Notification 1", date: "Just now", description: "Report found item has been submitted!" },
      { title: "Notification 2", date: "5 mins ago", description: "New comment on Report 12 has been written." },
      { title: "Notification 3", date: "10 mins ago", description: "Report lost item has been submitted!." },
      { title: "Notification 4", date: "20 mins ago", description: "Report 14 has been approved." },
      { title: "Notification 5", date: "1 hour ago", description: "Report 19 has been rejected." },
      { title: "Notification 6", date: "2 hours ago", description: "Item found: Black wallet." },
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
        window.location.href = "ProfileAdmin.html";
    });

    // Redirect to ParticipantNotifications.html when the notification icon is clicked
    const notificationIcon = document.querySelector(".notification-icon");
    notificationIcon.addEventListener("click", () => {
        window.location.href = "AdminNotifications.html";
    });

  });
  