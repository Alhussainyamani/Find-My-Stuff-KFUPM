document.addEventListener("DOMContentLoaded", () => {
    const itemId = getItemIdFromURL(); // Assuming you have the item ID in the URL
    const token = localStorage.getItem("token");

    // Helper function to get the item ID from the URL (assuming it's in the URL)
    function getItemIdFromURL() {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get("itemId"); // Or adjust as per your URL structure
    }

    function renderModifyInputFields(fieldsToModify) {
        // Get the container for the input fields
        const modifyInputContainer = document.getElementById("modify-input-fields"); // This matches the HTML ID

        modifyInputContainer.innerHTML = ""; // Clear any existing fields

        // Loop through the fields that need to be modified and create input elements for each
        fieldsToModify.forEach(field => {
            const label = document.createElement("label");
            label.setAttribute("for", `new-${field}`);
            label.textContent = `New ${field}:`;

            const input = document.createElement("input");
            input.type = "text";
            input.id = `new-${field}`;
            input.name = field;

            // Optionally, set the input value to the current value of the field
            const currentFieldValue = document.getElementById(field).textContent || ""; // Get current value from the page
            input.value = currentFieldValue;

            // Append the label and input field to the container
            modifyInputContainer.appendChild(label);
            modifyInputContainer.appendChild(input);
            modifyInputContainer.appendChild(document.createElement("br"));
        });
    }

    // Ensure the itemId and token exist
    if (!itemId || !token) {
        alert("Invalid request or missing token.");
        return;
    }

    // Fetch item details from the backend
    fetch(`http://localhost:3000/api/items/${itemId}`, {
        method: "GET",
        headers: {
            'Authorization': `Bearer ${token}`,
            "Content-Type": "application/json"
        }
    })
    .then((response) => response.json())
    .then((data) => {
        if (!data) {
            alert("Item not found.");
            return;
        }

        // Populate the page with the fetched details
        document.getElementById("reporter-name").textContent = data.createdBy.name || "Unknown"; 
        document.getElementById("report-date").textContent = new Date(data.createdAt).toLocaleDateString("en-GB");
        document.getElementById("item-description").textContent = data.description || "No description provided";
        document.getElementById("item-location").textContent = data.location || "Unknown location";
        document.getElementById("report-status").textContent = data.approviness || "Not approved";

        // Handle item photo
        const photoContainer = document.getElementById("item-photo");
        if (data.imageUrl) {
            const img = document.createElement("img");
            img.src = data.imageUrl;
            img.alt = "Item Image";
            img.classList.add("item-image");
            photoContainer.appendChild(img);
        } else {
            photoContainer.textContent = "No image available.";
        }
    })
    .catch((error) => {
        console.error("Error fetching item details:", error);
        alert("Error fetching item details.");
    });

    // Fetch Comments Button (Navigates to comments page for this specific item)
    const commentsButton = document.querySelector(".comments-go");
    commentsButton.addEventListener("click", () => {
        window.location.href = `CommentsAdmin.html?itemId=${itemId}`; // Navigate to the comments page for this item
    });

    // Edit Button Event (Triggers Edit Form)
    const editButton = document.querySelector(".edit-btn");
    editButton.addEventListener("click", () => {
        // Open the edit overlay to choose fields to modify
        document.getElementById("edit-overlay").style.display = "flex";
    });

    // Delete Button Event (Triggers Delete Confirmation)
    const deleteButton = document.querySelector(".delete-btn");
    deleteButton.addEventListener("click", () => {
        document.getElementById("confirmation-overlay").style.display = "flex";
    });

    // Handle the Confirm Delete Button
    const confirmDeleteBtn = document.getElementById("confirm-delete");
    confirmDeleteBtn.addEventListener("click", () => {
        fetch(`http://localhost:3000/api/items/${itemId}/delete`, {
            method: "DELETE",
            headers: {
                'Authorization': `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        })
        .then(response => response.json())
        .then(data => {
            document.getElementById("confirmation-overlay").style.display = "none";
            document.getElementById("delete-success-overlay").style.display = "flex";
        })
        .catch(error => {
            console.error("Error deleting item:", error);
            alert("Error deleting item.");
        });
    });

    // Handle the Cancel Delete Button
    const cancelDeleteBtn = document.getElementById("cancel-delete");
    cancelDeleteBtn.addEventListener("click", () => {
        document.getElementById("confirmation-overlay").style.display = "none";
    });

    // Handle Cancel Button for Edit Overlay
    const cancelEditBtn = document.getElementById("cancel-edit-btn");
    cancelEditBtn.addEventListener("click", () => {
        document.getElementById("edit-overlay").style.display = "none";
    });

    // Handle Modify Button (Shows modify fields)
    const modifyBtn = document.getElementById("modify-btn");
    modifyBtn.addEventListener("click", () => {
        const fieldsToModify = Array.from(document.querySelectorAll("input[type='checkbox']:checked")).map(input => input.value);
        
        if (fieldsToModify.length > 0) {
            // Close the edit overlay and show the modify input overlay
            document.getElementById("edit-overlay").style.display = "none";
            renderModifyInputFields(fieldsToModify);
            document.getElementById("modify-input-overlay").style.display = "flex";
        } else {
            alert("Please select at least one field to modify.");
        }
    });

    // Handle Save Modified Fields
    const enterBtn = document.getElementById("enter-btn");
    enterBtn.addEventListener("click", () => {
        const modifiedData = {};
        const fieldsToModify = Array.from(document.querySelectorAll("input[type='checkbox']:checked")).map(input => input.value);

        fieldsToModify.forEach(field => {
            const input = document.getElementById(`new-${field}`);
            modifiedData[field] = input.value;
        });

        // Send the modified data to the backend
        fetch(`/api/items/${itemId}`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(modifiedData),
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                // Update the displayed details with the new values
                fieldsToModify.forEach(field => {
                    document.getElementById(field).textContent = modifiedData[field];
                });

                // Close the modify input overlay and show success message
                document.getElementById("modify-input-overlay").style.display = "none";
                document.getElementById("success-overlay").style.display = "flex";
            } else {
                alert("Failed to update item.");
            }
        })
        .catch(err => {
            console.error("Error updating item:", err);
            alert("Error updating item.");
        });
    });

    // Handle Cancel Modify Input Button
    const cancelModifyInputBtn = document.getElementById("cancel-modify-input-btn");
    cancelModifyInputBtn.addEventListener("click", () => {
        document.getElementById("modify-input-overlay").style.display = "none";
    });

    // Handle Close Success Button
    const closeSuccessBtn = document.getElementById("close-success-btn");
    closeSuccessBtn.addEventListener("click", () => {
        document.getElementById("success-overlay").style.display = "none";
    });

    // Handle Close Delete Success Button
    const backToReportsBtn = document.getElementById("close-delete-success-btn");
    backToReportsBtn.addEventListener("click", () => {
        window.location.href = "AllReports.html"; // Or wherever your reports list is
    });
});
