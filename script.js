document.addEventListener('DOMContentLoaded', () => {
    const usernameField = document.querySelector('input.input-field[type="text"]');
    const passwordField = document.querySelector('input.input-field[type="password"]');
    const loginBtn = document.querySelector('.login-btn');
    const createAccountBtn = document.querySelector('.create-btn');
    const modal = document.getElementById('create-account-modal');
    const okBtn = document.getElementById('ok-btn');
    const cancelBtn = document.getElementById('cancel-btn');

    // Hide modal on page load
    modal.style.display = 'none';

    // Clear login form fields on page load
    usernameField.value = '';
    passwordField.value = '';

    // Clear login form fields when navigating back
    window.addEventListener('pageshow', (event) => {
        if (event.persisted) { // Check if the page is loaded from cache
            usernameField.value = '';
            passwordField.value = '';
        }
    });

    loginBtn.addEventListener('click', (event) => {
        event.preventDefault();  // Prevent form submission

        let isValid = true;

        // Remove previous error messages
        document.querySelectorAll('.error-message').forEach((msg) => msg.remove());

        // Validate username
        if (!usernameField.value.trim()) {
            isValid = false;
            const error = document.createElement('p');
            error.textContent = 'Username is required.';
            error.classList.add('error-message');
            usernameField.parentElement.appendChild(error);
        }

        // Validate password
        if (!passwordField.value.trim()) {
            isValid = false;
            const error = document.createElement('p');
            error.textContent = 'Password is required.';
            error.classList.add('error-message');
            passwordField.parentElement.appendChild(error);
        }

        if (isValid) {

            window.location.href = 'error.html';
        }
    });

    // Show modal for account creation
    createAccountBtn.addEventListener('click', () => {
        modal.style.display = 'flex';
    });

    // Handle OK in modal
    okBtn.addEventListener('click', () => {
        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value.trim();
        const confirmPassword = document.getElementById('confirm-password').value.trim();

        if (email && password && confirmPassword && password === confirmPassword) {
            modal.style.display = 'none';
            window.location.href = 'error.html';
        } else {
            alert('Please fill out all fields and ensure passwords match.');
        }
    });

    // Cancel button closes modal
    cancelBtn.addEventListener('click', () => {
        modal.style.display = 'none';
    });
});