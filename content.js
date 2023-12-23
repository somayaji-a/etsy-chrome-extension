chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "fetchData") {
        fetchData();
    }
});

function fetchData() {
    fetch('YOUR_API_URL')
        .then(response => response.json())
        .then(data => displayData(data))
        .catch(error => console.error('Error:', error));
}

function displayData(data) {
    const displayElement = document.createElement('div');
    displayElement.style.position = 'fixed';
    displayElement.style.top = '0';
    displayElement.style.left = '0';
    displayElement.style.zIndex = '1000';
    displayElement.textContent = JSON.stringify(data);
    document.body.appendChild(displayElement);
}
