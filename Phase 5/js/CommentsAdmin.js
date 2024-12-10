document.addEventListener("DOMContentLoaded", () => {
    const commentsScroll = document.querySelector(".comments-scroll");
    const commentInput = document.getElementById("comment-input");
    const sendCommentBtn = document.getElementById("send-comment-btn");

    // Popup elements for delete confirmation and success message
    const confirmationOverlay = document.getElementById("confirmation-overlay");
    const successOverlay = document.getElementById("success-overlay");
    const closeBtn = document.getElementById("close-btn");
    let commentToDeleteId = null; // Track which comment to delete

    const itemId = new URLSearchParams(window.location.search).get("itemId"); // Get itemId from the URL
    const token = localStorage.getItem("token");

    // Function to fetch comments from the backend (simulated with a sample API)
    function fetchComments() {
        return fetch(`http://localhost:3000/api/comments/${itemId}`, {
            method: "GET",
            headers: {
                'Authorization': `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        })
        .then(response => response.json())
        .then(data => {
            if (data.comments) {
                return data.comments; // Return the fetched comments
            } else {
                alert("No comments found for this item.");
                return []; // Return an empty array if no comments are found
            }
        })
        .catch((error) => {
            console.error("Error fetching comments:", error);
            alert("Error fetching comments.");
            return []; // Return an empty array in case of error
        });
    }

    // Function to render comments with delete icon
    function renderComments(comments) {
        commentsScroll.innerHTML = ""; // Clear previous comments
        comments.forEach((comment) => {
            const commentItem = document.createElement("div");
            commentItem.classList.add("comment-item", `sender-${comment.sender}`);
            commentItem.innerHTML = `
                <span class="delete-icon" data-id="${comment.id}">&#9776;</span> <!-- Delete icon -->
                <span>${comment.text}</span>
                <span class="comment-time">${comment.time}</span>
            `;
            commentsScroll.appendChild(commentItem);
        });
    }

    // Fetch and render comments on page load
    fetchComments()
        .then((comments) => {
            renderComments(comments);
        });

    // Handle sending new comment (posting to the backend)
    sendCommentBtn.addEventListener("click", () => {
        const userComment = commentInput.value.trim();
        if (userComment) {
            fetch("/api/comments", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ text: userComment })
            })
            .then((response) => response.json())
            .then((newComment) => {
                // After posting, fetch the updated list of comments
                fetchComments()
                    .then((comments) => {
                        renderComments(comments); // Re-render the updated list of comments
                    });
                commentInput.value = ""; // Clear input
            })
            .catch((error) => {
                console.error("Error posting comment:", error);
            });
        }
    });

    // Show confirmation overlay to delete comment
    function showConfirmation(id) {
        commentToDeleteId = id; // Store the ID of the comment to delete
        confirmationOverlay.style.display = "flex";
    }

    // Hide confirmation overlay
    function hideConfirmation() {
        confirmationOverlay.style.display = "none";
        commentToDeleteId = null; // Reset the ID
    }

    // Show success overlay after successful deletion
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
            const commentId = event.target.getAttribute("data-id");
            showConfirmation(commentId);
        }
    });

    // Confirm delete action and delete comment from backend
    confirmationOverlay.querySelector(".yes-btn").addEventListener("click", () => {
        if (commentToDeleteId !== null) {
            fetch(`/api/comments/${commentToDeleteId}`, {
                method: "DELETE",
            })
            .then((response) => {
                if (response.ok) {
                    // After deleting, fetch updated comments
                    fetchComments()
                        .then((comments) => {
                            renderComments(comments); // Re-fetch and render comments
                        });
                    hideConfirmation();
                    showSuccessOverlay(); // Show success message
                } else {
                    console.error("Error deleting comment");
                }
            })
            .catch((error) => {
                console.error("Error deleting comment:", error);
            });
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
