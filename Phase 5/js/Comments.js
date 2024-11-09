document.addEventListener("DOMContentLoaded", () => {
    const commentsScroll = document.querySelector(".comments-scroll");
    const commentInput = document.getElementById("comment-input");
    const sendCommentBtn = document.getElementById("send-comment-btn");
  
    // Sample comments with sender info
    const comments = [
      { text: "Try calling the park’s lost and found office", time: "6min", sender: "other1" },
      { text: "Hey, I was there around that time", time: "1d", sender: "other2" },
      { text: "Hope you find it!", time: "2d", sender: "other1" }
    ];
  
    // Function to render comments with different colors based on sender
    function renderComments() {
      commentsScroll.innerHTML = ""; // Clear previous comments
      comments.forEach(comment => {
        const commentItem = document.createElement("div");
        commentItem.classList.add("comment-item", `sender-${comment.sender}`);
        commentItem.innerHTML = `
          <span>${comment.text}</span>
          <span class="comment-time">${comment.time}</span>
        `;
        commentsScroll.appendChild(commentItem);
      });
    }
  
    // Render initial comments
    renderComments();
  
    // Handle sending new comment
    sendCommentBtn.addEventListener("click", () => {
      const userComment = commentInput.value.trim();
      if (userComment) {
        // Add user's comment with "user" class
        comments.unshift({ text: userComment, time: "Just now", sender: "user" });
        renderComments();
        commentInput.value = ""; // Clear input
      }
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
  