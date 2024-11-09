document.addEventListener("DOMContentLoaded", () => {
    const editButton = document.querySelector(".edit-btn");
    const deleteButton = document.querySelector(".delete-btn");
    const commentsButton = document.querySelector(".comments-go");

    const editOverlay = document.getElementById("edit-overlay");
    const modifyInputOverlay = document.getElementById("modify-input-overlay");
    const successOverlay = document.getElementById("success-overlay");
    const confirmationOverlay = document.getElementById("confirmation-overlay");
    const deleteSuccessOverlay = document.getElementById("delete-success-overlay");

    const modifyBtn = document.getElementById("modify-btn");
    const enterBtn = document.getElementById("enter-btn");
    const closeSuccessBtn = document.getElementById("close-success-btn");
    const closeDeleteSuccessBtn = document.getElementById("close-delete-success-btn");
    const cancelEditBtn = document.getElementById("cancel-edit-btn"); // New Cancel Button in Edit Overlay
    const cancelModifyInputBtn = document.getElementById("cancel-modify-input-btn"); // New Cancel Button in Modify Input Overlay

    let fieldsToModify = [];

    // Open edit overlay
    editButton.addEventListener("click", () => {
        editOverlay.style.display = "flex";
    });

    // Collect fields to modify and show modify input overlay
    modifyBtn.addEventListener("click", () => {
        fieldsToModify = Array.from(editOverlay.querySelectorAll("input[type='checkbox']:checked")).map(input => input.value);
        
        if (fieldsToModify.length > 0) {
            editOverlay.style.display = "none";
            renderModifyInputFields();
            modifyInputOverlay.style.display = "flex";
        }
    });

    // Render input fields based on selected checkboxes
    function renderModifyInputFields() {
        const modifyInputFields = document.getElementById("modify-input-fields");
        modifyInputFields.innerHTML = ""; // Clear previous inputs

        fieldsToModify.forEach(field => {
            const label = document.createElement("label");
            label.textContent = `New ${field.replace("-", " ")}: `;
            
            let input;
            if (field === "report-date") {
                input = document.createElement("input");
                input.type = "date"; // Date input for date fields
                input.id = `new-${field}`;
            } else {
                input = document.createElement("input");
                input.type = "text";
                input.id = `new-${field}`;
            }
            
            modifyInputFields.appendChild(label);
            modifyInputFields.appendChild(input);
            modifyInputFields.appendChild(document.createElement("br"));
        });
    }

    // Update details and show success overlay
    enterBtn.addEventListener("click", () => {
        let validInput = true;
        
        fieldsToModify.forEach(field => {
            const input = document.getElementById(`new-${field}`);
            const newValue = input.value;

            // Validate date field
            if (field === "report-date") {
                if (!newValue || !isValidDate(newValue)) {
                    alert("Please enter a valid date.");
                    validInput = false;
                    return;
                }
            }

            if (validInput) {
                document.getElementById(field).textContent = newValue;
            }
        });
        
        if (validInput) {
            modifyInputOverlay.style.display = "none";
            successOverlay.style.display = "flex";
        }
    });

    // Function to validate the date format (YYYY-MM-DD)
    function isValidDate(dateString) {
        const date = new Date(dateString);
        return date instanceof Date && !isNaN(date);
    }

    // Close success overlay
    closeSuccessBtn.addEventListener("click", () => {
        successOverlay.style.display = "none";
    });

    // Show delete confirmation overlay
    deleteButton.addEventListener("click", () => {
        confirmationOverlay.style.display = "flex";
    });

    // Confirm delete and show delete success overlay
    document.getElementById("confirm-delete").addEventListener("click", () => {
        confirmationOverlay.style.display = "none";
        deleteSuccessOverlay.style.display = "flex";
    });

    // Cancel delete
    document.getElementById("cancel-delete").addEventListener("click", () => {
        confirmationOverlay.style.display = "none";
    });

    // Redirect back to Reports
    closeDeleteSuccessBtn.addEventListener("click", () => {
        window.location.href = "AllReports.html";
    });

    // Redirect to comments page
    commentsButton.addEventListener("click", () => {
        window.location.href = "CommentsAdmin.html";
    });

    // Cancel Edit and close edit overlay
    cancelEditBtn.addEventListener("click", () => {
        editOverlay.style.display = "none";
    });

    // Cancel Modify Input and close modify input overlay
    cancelModifyInputBtn.addEventListener("click", () => {
        modifyInputOverlay.style.display = "none";
        fieldsToModify = []; // Reset selected fields to modify
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
