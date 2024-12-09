document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector(".report-form");
    if (!form) {
        console.error("Form not found. Ensure the form has the class 'report-form'.");
        return;
    }

    const nameInput = document.getElementById("name");
    const numberInput = document.getElementById("number");
    const locationInput = document.getElementById("location");
    const keywordInput = document.getElementById("keyword");
    const descriptionInput = document.getElementById("description");
    const sensitiveItemInput = document.getElementById("sensitive-item");
    const imageUpload = document.querySelector(".image-upload");
    const popupOverlay = document.getElementById("popup-overlay");
    const homeButton = document.getElementById("home-btn");

    // Error message elements
    const nameError = document.getElementById("name-error");
    const numberError = document.getElementById("number-error");
    const locationError = document.getElementById("location-error");
    const keywordError = document.getElementById("keyword-error");

    // Hidden file input for image upload
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = "image/*";
    fileInput.style.display = "none";
    document.body.appendChild(fileInput);

    if (imageUpload) {
        imageUpload.addEventListener("click", () => {
            fileInput.click();
        });
    }

    let base64Image = ''; // Variable to store the base64-encoded image

    fileInput.addEventListener("change", (event) => {
        if (event.target.files.length > 0) {
            const file = event.target.files[0];

            // Convert the selected image to base64
            const reader = new FileReader();
            reader.onload = () => {
                base64Image = reader.result; // Store the base64 data URL of the image
                imageUpload.src = base64Image; // Optionally, show the image
            };
            reader.readAsDataURL(file); // Convert the file to base64
        }
    });

    form.addEventListener("submit", async (event) => {
        event.preventDefault();

        let isValid = true;

        // Reset error messages
        nameError.textContent = "";
        numberError.textContent = "";
        locationError.textContent = "";
        keywordError.textContent = "";

        // Validate fields
        if (nameInput.value.trim() === "") {
            nameError.textContent = "Name is required.";
            nameError.style.display = "block";
            isValid = false;
        }

        if (numberInput.value.trim() === "") {
            numberError.textContent = "Number is required.";
            numberError.style.display = "block";
            isValid = false;
        } else if (!/^(\+9665\d{8})$/.test(numberInput.value.trim())) {
            numberError.textContent = "Number must start with +9665 and contain 8 digits.";
            numberError.style.display = "block";
            isValid = false;
        }

        if (locationInput.value.trim() === "") {
            locationError.textContent = "Last seen location is required.";
            locationError.style.display = "block";
            isValid = false;
        }

        if (keywordInput.value.trim() === "") {
            keywordError.textContent = "Keyword is required.";
            keywordError.style.display = "block";
            isValid = false;
        }

        if (!isValid) return;

        // Prepare FormData
        const formData = new FormData();
        formData.append("name", nameInput.value.trim());
        formData.append("number", numberInput.value.trim());
        formData.append("location", locationInput.value.trim());
        formData.append("keyword", keywordInput.value.trim());
        formData.append("description", descriptionInput.value.trim());
        formData.append("sensitiveItem", sensitiveItemInput.checked);
        formData.append("type", form.getAttribute("data-type"));

        // Pass the base64 image URL only if the image is selected
        if (base64Image) {
            formData.append("imageUrl", base64Image);
        }

        const token = localStorage.getItem("token");
        if (!token) {
            alert("You need to be logged in to perform this action.");
            return;
        }

        try {
            const response = await fetch('http://localhost:3000/api/items', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
                body: formData, // Send FormData directly
            });

            const result = await response.json();

            if (response.ok) {
                popupOverlay.style.display = "flex";
            } else {
                console.error("Server Error:", result);
                alert(result.message || "An error occurred while submitting the report.");
            }
        } catch (error) {
            console.error("Request Error:", error);
            alert("Error submitting the report. Please try again later.");
        }
    });

    if (homeButton) {
        homeButton.addEventListener("click", () => {
            window.location.href = "HomePage.html";
        });
    }
});
