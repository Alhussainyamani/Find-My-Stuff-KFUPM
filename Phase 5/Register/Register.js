document.addEventListener("DOMContentLoaded", () => {
    const registerForm = document.getElementById("register-form");
    const emailInput = document.getElementById("email");
    const phoneInput = document.getElementById("phone");
    const warningMessage = document.getElementById("warning-message");
    const successModal = document.getElementById("successModal");
    const loginPageButton = document.getElementById("loginPageButton");
  
    // Function to validate the email format
    function validateEmail() {
      const email = emailInput.value.trim();
      return email.endsWith("@kfupm.edu.sa");
    }
  
    // Function to validate the phone format
    function validatePhone() {
      const phone = phoneInput.value.trim();
      const saudiPhonePattern = /^\+9665\d{8}$/; // Regex to match +9665 followed by 8 digits
      return saudiPhonePattern.test(phone);
    }
  
    // Form submission event listener
    registerForm.addEventListener("submit", (event) => {
      event.preventDefault(); // Prevent form submission for validation
  
      // Reset warning message
      warningMessage.textContent = "";
  
      // Validate email and phone
      const isEmailValid = validateEmail();
      const isPhoneValid = validatePhone();
  
      if (!isEmailValid) {
        emailInput.style.backgroundColor = "#ffcccc"; // Light red background for error
        warningMessage.textContent = "Email must end with @kfupm.edu.sa";
      } else {
        emailInput.style.backgroundColor = ""; // Reset background if valid
      }
  
      if (!isPhoneValid) {
        phoneInput.style.backgroundColor = "#ffcccc"; // Light red background for error
        warningMessage.textContent += (warningMessage.textContent ? "\n" : "") + "Phone must start with +9665 and be followed by 8 digits.";
      } else {
        phoneInput.style.backgroundColor = ""; // Reset background if valid
      }
  
      // If both email and phone are valid, show the success modal
      if (isEmailValid && isPhoneValid) {
        successModal.style.display = "block"; // Show the modal
      }
    });
  
    // Redirect to login page when "Login Page" button is clicked
    loginPageButton.addEventListener("click", () => {
      window.location.href = "../Login/Login.html"; // Redirect to Login.html
    });
  });
  