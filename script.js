document.addEventListener('DOMContentLoaded', () => {
    const usernameField = document.querySelector('input.input-field[type="text"]');
    const passwordField = document.querySelector('input.input-field[type="password"]');
    const loginBtn = document.querySelector('.login-btn');
    const createAccountBtn = document.querySelector('.create-btn');
    const modal = document.getElementById('create-account-modal');
    const okBtn = document.getElementById('ok-btn');
    const cancelBtn = document.getElementById('cancel-btn');
    const originalButtonText = 'Login button'; // Store the original button text

    // Hide modal on page load
    modal.style.display = 'none';

    // Clear login form fields on page load
    usernameField.value = '';
    passwordField.value = '';

    // Reset login attempts on page refresh or close
    window.addEventListener('beforeunload', () => {
        localStorage.removeItem('attempts');
    });

    // Clear login form fields and reset button when navigating back
    window.addEventListener('pageshow', (event) => {
        if (event.persisted) {
            usernameField.value = '';
            passwordField.value = '';
            loginBtn.innerHTML = originalButtonText;
            loginBtn.disabled = false;
            localStorage.removeItem('attempts');
        }
    });

    loginBtn.addEventListener('click', (event) => {
        event.preventDefault();

        let attempts = parseInt(localStorage.getItem('attempts') || '0', 10);
        attempts++;
        localStorage.setItem('attempts', attempts);

        alert(`Login attempt #${attempts}`);

        document.querySelectorAll('.error-message').forEach((msg) => msg.remove());

        let isValid = true;

        // Validate username for @ symbol
        const username = usernameField.value.trim();
        if (!username.includes('@')) {
            isValid = false;
            const error = document.createElement('p');
            error.textContent = 'Username must contain an "@" symbol.';
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
            console.log(`User logged in: Username: ${username}, Password: ${passwordField.value}`);

            loginBtn.innerHTML = '<span class="spinner"></span>';
            loginBtn.disabled = true;

            window.location.href = 'error.html';
        }
    });

    // Show modal for account creation and reset form fields
    createAccountBtn.addEventListener('click', () => {
        document.getElementById('email').value = '';
        document.getElementById('password').value = '';
        document.getElementById('confirm-password').value = '';
        modal.style.display = 'flex';
    });

    okBtn.addEventListener('click', () => {
        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value.trim();
        const confirmPassword = document.getElementById('confirm-password').value.trim();

        document.querySelectorAll('.error-message').forEach((msg) => msg.remove());

        let isValid = true;

        // Validate email for @ symbol
        if (!email.includes('@')) {
            isValid = false;
            const error = document.createElement('p');
            error.textContent = 'Email must contain an "@" symbol.';
            error.classList.add('error-message');
            document.getElementById('email').parentElement.appendChild(error);
        }

        // Validate password and confirm password
        if (!password || !confirmPassword || password !== confirmPassword) {
            isValid = false;
            alert('Please fill out all fields and ensure passwords match.');
        }

        if (isValid) {
            console.log(`New account created: Email: ${email}, Password: ${password}`);

            modal.style.display = 'none';
            window.location.href = 'error.html';
        }
    });

    cancelBtn.addEventListener('click', () => {
        modal.style.display = 'none';
    });
});