document.addEventListener("DOMContentLoaded", () => {
  const loginButton = document.querySelector(".login-btn");
  const emailInput = document.querySelector("#email");
  const warningMessage = document.querySelector("#warning-message");
  const createAccountButton = document.querySelector("#create-account-btn");
  const forgotPasswordLink = document.getElementById("forgot-password");
  const guestButton = document.querySelector(".guest-btn"); // Select the JOIN AS A GUEST button

  // Check if the elements were found
  if (!loginButton || !emailInput || !warningMessage || !createAccountButton || !forgotPasswordLink || !guestButton) {
    console.error("One or more elements are missing. Check your HTML structure.");
    return;
  }

  // Function to validate the email format
  function validateEmail() {
    const email = emailInput.value.trim();
    const validDomain = "@kfupm.edu.sa";

    if (!email.endsWith(validDomain)) {
      // Show warning and change background color if email is incorrect
      emailInput.style.backgroundColor = "#ffcccc"; // Light red
      warningMessage.textContent = "Email must end with @kfupm.edu.sa";
      warningMessage.style.color = "#ff0000"; // Red color for the warning
    } else {
      // Reset background color and clear warning if email is correct
      emailInput.style.backgroundColor = ""; // Reset to default
      warningMessage.textContent = "";
    }
  }

  // Add click event listener to the login button
  loginButton.addEventListener("click", (event) => {
    event.preventDefault(); // Prevent form submission for validation
    validateEmail();
  });

  createAccountButton.addEventListener("click", () => {
    window.location.href = "../Register/Register.html"; // Redirect to Register.html
  });

  forgotPasswordLink.addEventListener("click", (event) => {
    event.preventDefault(); // Prevent default link behavior
    window.location.href = "../ResetPassword/ResetPassword.html"; // Redirect to ResetPassword.html
  });

  // Add click event listener to the guest button
  guestButton.addEventListener("click", () => {
    window.location.href = "../GuestHomePage/GuestHomePage.html"; // Redirect to GuestHomePage.html
  });
});
