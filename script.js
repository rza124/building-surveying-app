const imageInput = document.getElementById('imageInput');
const analyzeBtn = document.getElementById('analyzeBtn');
const generateReportBtn = document.getElementById('generateReportBtn');
const resultsDiv = document.getElementById('results');
const surveyDetails = document.getElementById('surveyDetails');
const loginBtn = document.getElementById('loginBtn');
const createUserBtn = document.getElementById('createUserBtn');
const additionalUserSection = document.getElementById('additionalUserSection');
const loginMessage = document.getElementById('loginMessage');
const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');

// Admin credentials
const ADMIN_CREDENTIALS = {
    username: "admin",
    password: "admin123" // Change this to a secure password
};

// User Login Functionality
loginBtn.addEventListener('click', () => {
    const username = usernameInput.value;
    const password = passwordInput.value;
    
    if (username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
        loginMessage.textContent = 'Admin login successful!';
        additionalUserSection.style.display = 'block'; // Show user creation section
    } else {
        // Check if user exists in local storage
