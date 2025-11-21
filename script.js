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
const imageAnalysisSection = document.getElementById('imageAnalysisSection');

// Admin credentials
const ADMIN_CREDENTIALS = {
    username: "admin",
    password: "admin123" // Change this to a secure password
};

// User Login Functionality
loginBtn.addEventListener('click', () => {
    const username = usernameInput.value;
    const password = passwordInput.value;

    // Check for admin credentials
    if (username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
        loginMessage.textContent = 'Admin login successful!';
        additionalUserSection.style.display = 'block'; // Show user creation section
        imageAnalysisSection.style.display = 'block'; // Show image analysis section
        usernameInput.value = ''; // Clear input fields
        passwordInput.value = '';
    } else {
        // Check for user credentials in local storage
        const storedPassword = localStorage.getItem(username);
        if (storedPassword && storedPassword === password) {
            loginMessage.textContent = 'User login successful!';
            imageAnalysisSection.style.display = 'block'; // Show image analysis section
            usernameInput.value = ''; // Clear input fields
            passwordInput.value = '';
        } else {
            loginMessage.textContent = 'Invalid username or password!';
        }
    }
});

// Create Additional User Functionality
createUserBtn.addEventListener('click', () => {
    const newUsername = document.getElementById('newUsername').value;
    const newPassword = document.getElementById('newPassword').value;

    if (newUsername && newPassword) {
        localStorage.setItem(newUsername, newPassword); // Store username and password
        document.getElementById('newUsername').value = ''; // Clear input fields
        document.getElementById('newPassword').value = '';
        alert('User created successfully!'); // Confirmation alert
    } else {
        alert('Please enter a username and password.'); // Error if no input
    }
});

// Image Analysis Functionality
analyzeBtn.addEventListener('click', () => {
    const file = imageInput.files[0];
    if (!file) {
        alert('Please select an image to analyze.');
        return;
    }

    const reader = new FileReader();
    reader.onload = () => {
        const base64Image = reader.result.split(',')[1]; // Get base64 part
        analyzeImage(base64Image);
    };
    reader.readAsDataURL(file);
});

async function analyzeImage(base64Image) {
    resultsDiv.innerHTML = 'Analyzing...';

    try {
        const response = await fetch('https://vision.googleapis.com/v1/images:annotate?key=AIzaSyC1RaQQIaQaGQCmY-ZvBbb9iYc5uW_4BlE', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                requests: [
                    {
                        image: { content: base64Image },
                        features: [{ type: "LABEL_DETECTION", maxResults: 5 }] // Change feature type as needed
                    }
                ]
            }),
        });

        const data = await response.json();
        displayResults(data);
    } catch (error) {
        resultsDiv.innerHTML = 'Error analyzing image: ' + error.message;
    }
}

function displayResults(data) {
    // Clear previous results
    resultsDiv.innerHTML = '';

    // Display analysis results
    if (data && data.responses && data.responses[0].labelAnnotations) {
        const results = data.responses[0].labelAnnotations;
        const resultHtml = results.map(result => `<p>${result.description} (Score: ${result.score.toFixed(2)})</p>`).join('');
        resultsDiv.innerHTML = `<h3>Analysis Results:</h3>${resultHtml}`;
    } else {
        resultsDiv.inner
