/*************************************************************
 * @file        : receive.js    
 * @description : JavaScript file for receive.html in the public folder.
 *************************************************************/

/****************************
 * Frontend intraction code
 ***************************/

/**
 * Function to display response message
 * @param {string} message - The message to display
 */
function displayResponse(message) {
    const responseDisplay = document.getElementById('responseDisplay');
    responseDisplay.innerText = message;
    responseDisplay.style.display = 'flex';
}

/**
 * Function to update UI after successful file download
 */
function updateUIAfterSuccess() {
    document.getElementById('boxSenderIP').style.display = 'none';
    document.getElementById('receiveButton').style.display = 'none';
    document.getElementById('responseDisplay').style.display = 'none';
    document.getElementById('tagline').innerHTML = '<p>Received successfully!</p>';

}

/**
 * Add event listeners once DOM content is loaded
 */
document.addEventListener('DOMContentLoaded', () => {
    const inputField = document.getElementById('boxSenderIP');
    const receiveButton = document.getElementById('receiveButton');

    // Function to handle Enter key press and trigger button click
    function handleEnterKey(event) {
        if (event.key === 'Enter') {
            event.preventDefault(); // Prevent default action (e.g., form submission)
            receiveButton.click(); // Trigger button click
        }
    }

    // Attach event listeners
    inputField.addEventListener('keypress', handleEnterKey);
    receiveButton.addEventListener('click', receiveData);

    // Focus on the input field initially
    inputField.focus();
});



/******************
 * Backend code
 ******************/

/**
 * Function to handle receiving data from the server
 */
async function receiveData() {
    const senderIP = document.getElementById('boxSenderIP').value.trim();

    if (!isValidIP(senderIP)) {
        return displayResponse('Invalid IP address');
    }

    try {
        // Testing code: recevie -> create file
        const textContent = 'hello there';
        const blob = new Blob([textContent], { type: 'text/plain' });

        // Download the received file
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'myFiles.txt';
        document.body.appendChild(link);
        link.click();
        URL.revokeObjectURL(link.href);
        document.body.removeChild(link);
    }
    catch (error) {
        console.error('Error downloading file:', error);
    }

    updateUIAfterSuccess();
}

function isValidIP(ip) {
    const ipPattern = /^(25[0-5]|2[0-4][0-9]|[0-1]?[0-9]{1,2})\.(25[0-5]|2[0-4][0-9]|[0-1]?[0-9]{1,2})\.(25[0-5]|2[0-4][0-9]|[0-1]?[0-9]{1,2})\.(25[0-5]|2[0-4][0-9]|[0-1]?[0-9]{1,2})$/;
    return ipPattern.test(ip);
}
