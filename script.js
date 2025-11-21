const loginBtn = document.getElementById('loginBtn');
const loginMessage = document.getElementById('loginMessage');
const adminUsername = document.getElementById('adminUsername');
const adminPassword = document.getElementById('adminPassword');
const additionalUserSection = document.getElementById('additionalUserSection');

const ADMIN_CREDENTIALS = {
    username: "admin",
    password: "admin123" // You can change this to a secure password
};

// Admin Login Functionality
loginBtn.addEventListener('click', () => {
    const username = adminUsername.value;
    const password = adminPassword.value;
    
    if (username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
        loginMessage.textContent = 'Login successful!';
        additionalUserSection.style.display = 'block'; // Show user creation section
    } else {
        loginMessage.textContent = 'Invalid username or password!';
    }
});
