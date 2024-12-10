document.addEventListener("DOMContentLoaded", () => {
  const loginButton = document.querySelector(".login-btn");
  const emailInput = document.querySelector("#email");
  const passwordInput = document.querySelector("input[type='password']");
  const warningMessage = document.querySelector("#warning-message");
  const createAccountButton = document.querySelector("#create-account-btn");
  const forgotPasswordLink = document.getElementById("forgot-password");
  const guestButton = document.querySelector(".guest-btn");

  // Check if the elements were found
  if (!loginButton || !emailInput || !passwordInput || !warningMessage || !createAccountButton || !forgotPasswordLink || !guestButton) {
    console.error("One or more elements are missing. Check your HTML structure.");
    return;
  }

  // Function to validate email format
  function validateEmailFormat(email) {
    const validDomain = "@kfupm.edu.sa";
    return email.endsWith(validDomain);
  }

  // Function to handle login validation
  function handleLogin() {
    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();

    if (!validateEmailFormat(email)) {
      emailInput.style.backgroundColor = "#ffcccc";
      warningMessage.textContent = "Email must end with @kfupm.edu.sa";
      warningMessage.style.color = "#ff0000";
      return;
    }

    // Prepare the data to send to the backend (login)
    const userData = {
      email: email,
      password: password
    };

    // Make the POST request to the backend API
    fetch("http://localhost:3000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(userData)
    })
      .then(response => response.json())
      .then(data => {
        if (data.token) {
          // Store the token in local storage for further authentication if necessary
          localStorage.setItem("token", data.token);

          // Check the user role and redirect accordingly
          if (data.user.role === "admin") {
            window.location.href = "AdminHome.html"; // Redirect to admin dashboard
          } else if (data.user.role === "participant") {
            window.location.href = "HomePage.html"; // Redirect to participant homepage
          } else {
            showWarning("Invalid role. Please contact support.");
          }
        } else {
          showWarning(data.message || "Login failed. Please try again.");
        }
      })
      .catch(error => {
        console.error("Error:", error);
        showWarning("An error occurred. Please try again.");
      });
  }

  // Display warning message in red
  function showWarning(message) {
    warningMessage.textContent = message;
    warningMessage.style.color = "#ff0000";
    emailInput.style.backgroundColor = "#ffcccc";
  }

  // Add click event listener to the login button
  loginButton.addEventListener("click", (event) => {
    event.preventDefault();
    handleLogin();
  });

  createAccountButton.addEventListener("click", () => {
    window.location.href = "Register.html";
  });

  forgotPasswordLink.addEventListener("click", (event) => {
    event.preventDefault();
    window.location.href = "ResetPassword.html";
  });

  guestButton.addEventListener("click", () => {
    window.location.href = "GuestHomePage.html";
  });
});
