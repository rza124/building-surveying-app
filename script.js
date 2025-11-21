const imageInput = document.getElementById('imageInput');
const analyzeBtn = document.getElementById('analyzeBtn');
const generateReportBtn = document.getElementById('generateReportBtn');
const resultsDiv = document.getElementById('results');
const surveyDetails = document.getElementById('surveyDetails');

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
    
    // Display analysis results here, customize based on your API response
    if (data && data.responses && data.responses[0].labelAnnotations) {
        const results = data.responses[0].labelAnnotations;
        const resultHtml = results.map(result => `<p>${result.description} (Score: ${result.score.toFixed(2)})</p>`
