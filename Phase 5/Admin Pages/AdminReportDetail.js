document.addEventListener("DOMContentLoaded", () => {
  const deleteButton = document.querySelector(".delete-btn");
  const modal = document.getElementById("deleteModal");
  const confirmDelete = document.getElementById("confirmDelete");
  const cancelDelete = document.getElementById("cancelDelete");
  const successModal = document.getElementById("successModal");
  const reportsButton = document.getElementById("reportsButton");

  if (deleteButton) {
    deleteButton.addEventListener("click", () => {
      modal.style.display = "block";
    });
  }

  if (cancelDelete) {
    cancelDelete.addEventListener("click", () => {
      modal.style.display = "none";
    });
  }

  if (confirmDelete) {
    confirmDelete.addEventListener("click", () => {
      modal.style.display = "none";
      successModal.style.display = "block"; // Show the success modal
    });
  }

  reportsButton.addEventListener("click", () => {
    window.location.href = "Reports.html"; // Redirect to the Reports page
  });

  window.addEventListener("click", (event) => {
    if (event.target === modal) {
      modal.style.display = "none";
    }
    if (event.target === successModal) {
      successModal.style.display = "none";
    }
  });
});
