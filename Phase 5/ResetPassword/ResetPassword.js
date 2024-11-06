document.addEventListener("DOMContentLoaded", () => {
    const resetPasswordForm = document.getElementById("reset-password-form");
    const emailInput = document.getElementById("email");
    const warningMessage = document.getElementById("warning-message");
    const successModal = document.getElementById("successModal");
    const loginButton = document.getElementById("loginButton");
  
    // Function to validate the email format
    function validateEmail() {
      const email = emailInput.value.trim();
      return email.endsWith("@kfupm.edu.sa");
    }
  
    // Form submission event listener
    resetPasswordForm.addEventListener("submit", (event) => {
      event.preventDefault(); // Prevent form submission for validation
  
      // Validate email format
      if (validateEmail()) {
        successModal.style.display = "block"; // Show the modal
      } else {
        warningMessage.textContent = "Email must end with @kfupm.edu.sa";
        warningMessage.style.color = "#ff0000"; // Error message in red
        emailInput.style.backgroundColor = "#ffcccc"; // Light red background for error
      }
    });
  
    // Redirect to login page when "Login Page" button is clicked
    loginButton.addEventListener("click", () => {
      window.location.href = "../Login/Login.html"; // Redirect to Login.html
    });
  });
  