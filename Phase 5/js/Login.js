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

  // Sample data for Participants and Admins
  const participants = [
    { email: "participant1@kfupm.edu.sa", password: "password123" },
    { email: "participant2@kfupm.edu.sa", password: "password456" }
  ];

  const admins = [
    { email: "admin1@kfupm.edu.sa", password: "adminpass1" },
    { email: "admin2@kfupm.edu.sa", password: "adminpass2" }
  ];

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

    const participant = participants.find(user => user.email === email);
    const admin = admins.find(user => user.email === email);

    if (participant) {
      if (participant.password === password) {
        window.location.href = "HomePage.html"; // Redirect to participant homepage
      } else {
        showWarning("Incorrect password. Please try again.");
      }
    } else if (admin) {
      if (admin.password === password) {
        window.location.href = "AdminHome.html"; // Redirect to admin dashboard
      } else {
        showWarning("Incorrect password. Please try again.");
      }
    } else {
      showWarning("No such email is registered on our platform.");
    }
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
