document.querySelector('.send-btn').addEventListener('click', function() {
    const commentInput = document.querySelector('.comment-input');
    if (commentInput.value.trim() === '') {
        alert('Please enter a comment before sending.');
    } else {
        alert('Comment posted: ' + commentInput.value);
        commentInput.value = ''; // Clear the input after posting
    }
});
