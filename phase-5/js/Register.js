document.addEventListener("DOMContentLoaded", () => {
  const registerForm = document.getElementById("register-form");
  const firstNameInput = document.getElementById("first-name");
  const lastNameInput = document.getElementById("last-name");
  const emailInput = document.getElementById("email");
  const phoneInput = document.getElementById("phone");
  const passwordInput = document.getElementById("password"); // Add password input
  const confirmPasswordInput = document.getElementById("confirm-password"); // Add confirm password input
  const occupationSelect = document.getElementById("occupation");
  const warningMessage = document.getElementById("warning-message");
  const successModal = document.getElementById("successModal");
  const loginPageButton = document.getElementById("loginPageButton");

  // Check if all required elements exist
  if (!firstNameInput || !lastNameInput || !emailInput || !phoneInput || !passwordInput || !confirmPasswordInput || !occupationSelect || !warningMessage || !successModal || !loginPageButton) {
    console.error("One or more required elements are missing.");
    return;
   }

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

  // Function to check if passwords match
  function validatePassword() {
    return passwordInput.value.trim() === confirmPasswordInput.value.trim();
  }

  // Function to handle the registration process
  function handleRegister() {
    console.log("Inside handleRegister");

    const firstName = firstNameInput.value.trim();
    const lastName = lastNameInput.value.trim();
    const email = emailInput.value.trim();
    const phone = phoneInput.value.trim();
    const password = passwordInput.value.trim();
    const occupation = occupationSelect.value;

    console.log("Form values:", { firstName, lastName, email, phone, password, occupation });

    if (!validateEmail()) {
      emailInput.style.backgroundColor = "#ffcccc"; // Light red background for error
      warningMessage.textContent = "Email must end with @kfupm.edu.sa";
      return;
    } else {
      emailInput.style.backgroundColor = ""; // Reset background if valid
    }

    if (!validatePhone()) {
      phoneInput.style.backgroundColor = "#ffcccc"; // Light red background for error
      warningMessage.textContent += (warningMessage.textContent ? "\n" : "") + "Phone must start with +9665 and be followed by 8 digits.";
      return;
    } else {
      phoneInput.style.backgroundColor = ""; // Reset background if valid
    }

    if (!validatePassword()) {
      confirmPasswordInput.style.backgroundColor = "#ffcccc"; // Light red background for error
      warningMessage.textContent += (warningMessage.textContent ? "\n" : "") + "Passwords do not match.";
      return;
    } else {
      confirmPasswordInput.style.backgroundColor = ""; // Reset background if valid
    }

    // Prepare the data to send to the backend (register)
    const userData = {
      name: `${firstName} ${lastName}`,  // Combine first and last names
      email,
      password,
      role: "participant"  // Set role based on occupation (default to participant)
    };

    console.log("User data prepared:", userData);

    // Make the POST request to the backend API
    fetch("http://localhost:3000/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(userData)
    })
      .then(response => response.json())
      .then(data => {
        console.log("Data received:", data);
        if (data.message === "User registered successfully") {
          successModal.style.display = "block";
          console.log("Registration successful");
        } else {
          showWarning(data.message || "Registration failed. Please try again.");
          console.log("Registration failed");
        }
      })
      .catch(error => {
        console.error("Error:", error);
        showWarning("An error occurred during registration. Please try again.");
        console.log("Catch block triggered");
      });
  }

  // Function to display the warning message
  function showWarning(message) {
    warningMessage.textContent = message;
    warningMessage.style.color = "#ff0000";
  }

  // Form submission event listener
  registerForm.addEventListener("submit", (event) => {
    event.preventDefault(); // Prevent form submission for validation
    handleRegister();
  });

  // Redirect to login page when "Login Page" button is clicked
  loginPageButton.addEventListener("click", () => {
    window.location.href = "Login.html"; // Redirect to Login.html
  });
});
