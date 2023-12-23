document.addEventListener('DOMContentLoaded', function() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.runtime.sendMessage({
            action: "fetchData", 
            url: tabs[0].url
        }, response => {
            displayListingInfo(response.data);
        });
    });
});

function displayListingInfo(data) {
    const infoElement = document.getElementById('listingInfo');
    if (data) {
        infoElement.innerHTML = formatListingData(data);
        addCopyButtons();
    } else {
        infoElement.textContent = 'No data found for this listing.';
    }
}

function formatListingData(data) {
    let htmlContent = `<h2>Listing Details</h2>`;

    htmlContent += createSectionWithCopy('Title', data.title);
    htmlContent += createSectionWithCopy('Description', data.description);
    htmlContent += createSectionWithCopy('Tags', data.tags ? data.tags.join(', ') : 'N/A');
    htmlContent += createSectionWithCopy('Materials', data.materials);
    htmlContent += createSection('Number of Favourites', data.num_favorers)
    htmlContent += createSection('Views', data.views)
    return htmlContent;
}

function createSection(title, content) {
    return `<div class="section">
                <strong>${title}:</strong> <span>${content || 'N/A'}</span>
            </div>`;
}

function createSectionWithCopy(title, content) {
    return `<div class="section">
                <strong>${title}:</strong> <span id="${title.toLowerCase()}">${content || 'N/A'}</span>
                <button class="copy-button" data-clipboard-target="#${title.toLowerCase()}">
                    <i class="fa fa-clipboard copy-icon"></i>
                </button>
            </div>`;
}


function addCopyButtons() {
    document.querySelectorAll('.copy-button').forEach(button => {
        button.addEventListener('click', function() {
            const content = document.querySelector(this.getAttribute('data-clipboard-target')).textContent;
            copyToClipboard(content, this);
        });
    });
}

function copyToClipboard(text, button) {
    navigator.clipboard.writeText(text).then(() => {
        const originalIcon = button.innerHTML;
        button.innerHTML = '<i class="fa fa-check copy-icon"></i> Copied';
        button.disabled = true;
        setTimeout(() => {
            button.innerHTML = originalIcon;
            button.disabled = false;
        }, 3000); // Reset after 3 seconds
    }).catch(err => {
        console.error('Error in copying text: ', err);
    });
}