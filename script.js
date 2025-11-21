const imageInput = document.getElementById('imageInput');
const analyzeBtn = document.getElementById('analyzeBtn');
const generateReportBtn = document.getElementById('generateReportBtn');
const resultsDiv = document.getElementById('results');
const surveyDetails = document.getElementById('surveyDetails');
const loginBtn = document.getElementById('loginBtn');
const createUserBtn = document.getElementById('createUserBtn');
const additionalUserSection = document.getElementById('additionalUserSection');
const loginMessage = document.getElementById('loginMessage');
const adminUsername = document.getElementById('adminUsername');
const adminPassword = document.getElementById('adminPassword');
const newUsername = document.getElementById('newUsername');
const newPassword = document.getElementById('newPassword');

const ADMIN_CREDENTIALS = {
    username: "admin",
    password: "admin123" // Change this to a secure password
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

// Create Additional User Functionality
createUserBtn.addEventListener('click', () => {
    const username = newUsername.value;
    const password = newPassword.value;

    if (username && password) {
        localStorage.setItem(username, password); // Store username and password
        newUsername.value = ''; // Clear the input fields
        newPassword.value = '';
        alert('User created successfully!'); // Confirmation alert
    } else {
        alert('Please enter a username and password.'); // Error if no input
    }
});

// Image Analysis
