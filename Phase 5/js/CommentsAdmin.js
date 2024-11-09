document.addEventListener("DOMContentLoaded", () => {
    const commentsScroll = document.querySelector(".comments-scroll");
    const commentInput = document.getElementById("comment-input");
    const sendCommentBtn = document.getElementById("send-comment-btn");

    // Popup elements for delete confirmation and success message
    const confirmationOverlay = document.getElementById("confirmation-overlay");
    const successOverlay = document.getElementById("success-overlay");
    const closeBtn = document.getElementById("close-btn");
    let commentToDeleteIndex = null; // Track which comment to delete

    // Sample comments with sender info
    const comments = [
        { text: "Try calling the park’s lost and found office", time: "6min", sender: "other1" },
        { text: "Hey, I was there around that time", time: "1d", sender: "other2" },
        { text: "Hope you find it!", time: "2d", sender: "other1" }
    ];

    // Function to render comments with delete icon
    function renderComments() {
        commentsScroll.innerHTML = ""; // Clear previous comments
        comments.forEach((comment, index) => {
            const commentItem = document.createElement("div");
            commentItem.classList.add("comment-item", `sender-${comment.sender}`);
            commentItem.innerHTML = `
                <span class="delete-icon" data-index="${index}">&#9776;</span> <!-- Delete icon -->
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
            comments.unshift({ text: userComment, time: "Just now", sender: "user" });
            renderComments();
            commentInput.value = ""; // Clear input
        }
    });

    // Show confirmation overlay
    function showConfirmation(index) {
        commentToDeleteIndex = index; // Store the index of the comment to delete
        confirmationOverlay.style.display = "flex";
    }

    // Hide confirmation overlay
    function hideConfirmation() {
        confirmationOverlay.style.display = "none";
        commentToDeleteIndex = null; // Reset the index
    }

    // Show success overlay
    function showSuccessOverlay() {
        successOverlay.style.display = "flex";
    }

    // Hide success overlay
    closeBtn.addEventListener("click", () => {
        successOverlay.style.display = "none";
    });

    // Event listener for delete icon
    commentsScroll.addEventListener("click", (event) => {
        if (event.target.classList.contains("delete-icon")) {
            const index = event.target.getAttribute("data-index");
            showConfirmation(index);
        }
    });

    // Confirm delete action
    confirmationOverlay.querySelector(".yes-btn").addEventListener("click", () => {
        if (commentToDeleteIndex !== null) {
            comments.splice(commentToDeleteIndex, 1); // Delete the comment
            renderComments();
            hideConfirmation();
            showSuccessOverlay(); // Show success message
        }
    });

    // Cancel delete action
    confirmationOverlay.querySelector(".no-btn").addEventListener("click", hideConfirmation);

    const sidebar = document.querySelector(".sidebar");
    const sidebarMenu = document.querySelector(".sidebar-menu");

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
