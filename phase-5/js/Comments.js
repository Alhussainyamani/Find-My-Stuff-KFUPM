document.addEventListener("DOMContentLoaded", () => {
  const commentsScroll = document.querySelector(".comments-scroll");
  const commentInput = document.getElementById("comment-input");
  const sendCommentBtn = document.getElementById("send-comment-btn");

  const itemId = new URLSearchParams(window.location.search).get("itemId"); // Get itemId from the URL
  const token = localStorage.getItem("token");

  let comments = []; // Declare comments array to hold the fetched comments

  // Ensure the itemId and token exist
  if (!itemId || !token) {
      alert("Invalid request or missing token.");
      return;
  }

  // Fetch the comments for the specific item
  function fetchComments() {
      fetch(`http://localhost:3000/api/comments/${itemId}`, {
          method: "GET",
          headers: {
              'Authorization': `Bearer ${token}`,
              "Content-Type": "application/json"
          }
      })
      .then((response) => response.json())
      .then((data) => {
          if (data.comments) {
              comments = data.comments; // Save the fetched comments to the comments array
              renderComments(comments); // Render the comments list
          } else {
              alert("No comments found for this item.");
          }
      })
      .catch((error) => {
          console.error("Error fetching comments:", error);
          alert("Error fetching comments.");
      });
  }

  // Render the comments in the UI
  function renderComments(comments) {
      commentsScroll.innerHTML = ""; // Clear previous comments

      // Sort comments by createdAt timestamp in ascending order (oldest first)
      comments.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));

      comments.forEach(comment => {
          const senderName = comment.createdBy && comment.createdBy.name ? comment.createdBy.name : "Anonymous";
          
          // Replace spaces with hyphens for valid class names
          const senderClass = `sender-${senderName.replace(/\s+/g, '-')}`;

          const commentItem = document.createElement("div");
          commentItem.classList.add("comment-item", senderClass);
          commentItem.innerHTML = ` 
              <span class="comment-sender">${senderName}</span>
              <span class="comment-text">${comment.text}</span>
              <span class="comment-time">${new Date(comment.createdAt).toLocaleString()}</span>
          `;
          commentsScroll.appendChild(commentItem);
      });
  }

  // Handle sending new comment
  sendCommentBtn.addEventListener("click", () => {
      const userComment = commentInput.value.trim();
      if (userComment) {
          // Send the new comment to the backend
          fetch(`http://localhost:3000/api/comments/${itemId}`, {
              method: "POST",
              headers: {
                  'Authorization': `Bearer ${token}`,
                  "Content-Type": "application/json"
              },
              body: JSON.stringify({ text: userComment })
          })
          .then((response) => response.json())
          .then((data) => {
              if (data.message === "Comment added successfully") {
                  const newComment = data.comment;
                  comments.push(newComment); // Add the new comment to the bottom of the array

                  // Re-render the sorted list of comments
                  renderComments(comments); // Re-render the comments list
                  commentInput.value = ""; // Clear input
              } else {
                  alert("Failed to add comment.");
              }
          })
          .catch((error) => {
              console.error("Error adding comment:", error);
              alert("Error adding comment.");
          });
      } else {
          alert("Please enter a comment before submitting.");
      }
  });

  // Initial fetch of comments
  fetchComments();

  // Sidebar toggle and profile/navigation actions
  const sidebar = document.querySelector(".sidebar");
  const sidebarMenu = document.querySelector(".sidebar-menu");
  sidebarMenu.addEventListener("click", () => {
      sidebar.classList.toggle("sidebar-expanded");
  });

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
