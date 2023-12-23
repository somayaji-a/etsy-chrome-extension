chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "fetchData") {
        const listingId = getListingId(request.url);
        const listingUrl = `https://openapi.etsy.com/v3/application/listings/${listingId}`;
        const requestOptions = {
            method: 'GET',
            headers: {
                'x-api-key': 'API_KEY' // Replace with your Etsy API Key
            }
        };

        fetch(listingUrl, requestOptions)
            .then(response => response.json())
            .then(data => sendResponse({data: data}))
            .catch(error => console.error('Error:', error));

        return true; // Indicates to Chrome that sendResponse will be called asynchronously
    }
});

function getListingId(url) {
    // Logic to extract listing ID from the URL
    const match = url.match(/\/listing\/(\d+)/);
    return match ? match[1] : null;
}
