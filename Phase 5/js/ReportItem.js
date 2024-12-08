document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector(".report-form");
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

  const sidebar = document.querySelector(".sidebar");
  const sidebarMenu = document.querySelector(".sidebar-menu");

  // Create a hidden file input for image upload
  const fileInput = document.createElement("input");
  fileInput.type = "file";
  fileInput.accept = "image/*";
  fileInput.style.display = "none";
  document.body.appendChild(fileInput);

  // Check if elements exist before adding event listeners
  if (sidebarMenu) {
      sidebarMenu.addEventListener("click", () => {
          sidebar.classList.toggle("sidebar-expanded");
      });
  }

  // Add event listener to image placeholder for file upload
  if (imageUpload) {
      imageUpload.addEventListener("click", () => {
          fileInput.click();
      });
  }

  fileInput.addEventListener("change", (event) => {
      if (event.target.files.length > 0) {
          const file = event.target.files[0];
          const reader = new FileReader();
          reader.onload = (e) => {
              imageUpload.src = e.target.result;
          };
          reader.readAsDataURL(file);
      }
  });

  // Form validation and API submission
  if (form) {
      form.addEventListener("submit", async (event) => {
          event.preventDefault();
      
          let isValid = true;
      
          // Reset error messages
          nameError.textContent = "";
          numberError.textContent = "";
          locationError.textContent = "";
          keywordError.textContent = "";
      
          // Validate each field
          if (nameInput.value.trim() === "") {
              nameError.textContent = "Name is required.";
              nameError.style.display = "block";
              isValid = false;
          } else {
              nameError.style.display = "none";
          }
      
          if (numberInput.value.trim() === "") {
              numberError.textContent = "Number is required.";
              numberError.style.display = "block";
              isValid = false;
          } else if (!/^(\+9665\d{8})$/.test(numberInput.value.trim())) {
              numberError.textContent = "Number must start with +9665 and contain 8 digits.";
              numberError.style.display = "block";
              isValid = false;
          } else {
              numberError.style.display = "none";
          }
      
          if (locationInput.value.trim() === "") {
              locationError.textContent = "Last seen location is required.";
              locationError.style.display = "block";
              isValid = false;
          } else {
              locationError.style.display = "none";
          }
      
          if (keywordInput.value.trim() === "") {
              keywordError.textContent = "Keyword is required.";
              keywordError.style.display = "block";
              isValid = false;
          } else {
              keywordError.style.display = "none";
          }
      
          // If form is valid, send the data to the API
          if (isValid) {
              // Prepare data to send to the API
              const formData = new FormData();
              formData.append("name", nameInput.value.trim());
              formData.append("number", numberInput.value.trim());
              formData.append("location", locationInput.value.trim());
              formData.append("keyword", keywordInput.value.trim());
              formData.append("description", descriptionInput.value.trim());
              formData.append("sensitiveItem", sensitiveItemInput.checked);
              
              if (fileInput.files.length > 0) {
                  formData.append("image", fileInput.files[0]);
              }

              try {
                  // Send data to the server (replace with your actual API endpoint)
                  const response = await fetch('http://127.0.0.1:3000/api/items', {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${token}`, // Add the token here
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData),
                });

                  const result = await response.json();

                  if (response.ok) {
                      // Show success popup
                      popupOverlay.style.display = "flex"; 
                  } else {
                      // Handle server errors (e.g. validation error or server issue)
                      alert(result.message || "An error occurred while submitting the report.");
                  }
              } catch (error) {
                  // Handle fetch error
                  alert("Error submitting the report. Please try again later.");
              }
          }
      });
  }

  // Redirect to homepage when "Home Page" button is clicked
  if (homeButton) {
      homeButton.addEventListener("click", () => {
          window.location.href = "HomePage.html"; // Adjust the path as needed
      });
  }

  const profileIcon = document.querySelector(".profile-icon");
  if (profileIcon) {
      profileIcon.addEventListener("click", () => {
          window.location.href = "ProfileParticipantPage.html";
      });
  }

  // Redirect to ParticipantNotifications.html when the notification icon is clicked
  const notificationIcon = document.querySelector(".notification-icon");
  if (notificationIcon) {
      notificationIcon.addEventListener("click", () => {
          window.location.href = "ParticipantNotifications.html";
      });
  }
});
