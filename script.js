const imageInput = document.getElementById('imageInput');
const analyzeBtn = document.getElementById('analyzeBtn');
const resultsDiv = document.getElementById('results');

analyzeBtn.addEventListener('click', () => {
  const file = imageInput.files[0];
  if (!file) {
    alert('Please select an image to analyze.');
    return;
  }
  
  // Read image as base64
  const reader = new FileReader();
  reader.onload = () => {
    const base64Image = reader.result.split(',')[1]; // Remove data URL prefix
    analyzeImage(base64Image);
  };
  reader.readAsDataURL(file);
});

function analyzeImage(base64Image) {
  // Call to AI API (example placeholder)
  resultsDiv.innerHTML = 'Analyzing...';
  
  // Replace this URL with your actual API endpoint
  fetch('https://example.com/api/analyze', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ image: base64Image }),
  })
  .then(response => response.json())
  .then(data => {
    resultsDiv.innerHTML = '<pre>' + JSON.stringify(data, null, 2) + '</pre>';
  })
  .catch(error => {
    resultsDiv.innerHTML = 'Error analyzing image.';
    console.error(error);
  });
}