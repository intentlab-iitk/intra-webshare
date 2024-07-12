/*************************************************************
 * @file        : receive.js    
 * @description : This is a JavaScript file for receive.html
 *                in the public folder.
 *************************************************************/

/**
 * Function to handle receive data from the server
 */
async function receiveData() {
    try {
        // Get the Target IP from the input field
        const senderIP = document.getElementById('boxSenderIP').value.trim();
        if (!senderIP) {
            console.error('SenderIP is required');
            return;
        }

        // Construct the request body
        const requestPayload = {
            senderIP: senderIP
        };

        // Make a POST request to server to fetch data associated with Target IP
        const response = await fetch('http://intentlab.iitk.ac.in:8080/getfile', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestPayload)
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        // Handle the file download
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.style.display = 'none';
        a.href = url;
        a.download = 'downloaded_file';  // Optionally set a default file name
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);

        document.getElementById('boxSenderIP').style.display = 'none';
        document.getElementById('receiveButton').style.display = 'none';
        document.getElementById('responseDisplay').innerText = 'File received successfully';
        document.getElementById('responseDisplay').style.display = 'flex';

    } catch (error) {
        console.error('Error fetching data:', error);
        document.getElementById('responseDisplay').innerText = 'Error receiving file';
        document.getElementById('responseDisplay').style.display = 'flex';
    }
}

/**
 * Add event listeners once DOM content is loaded
 */
document.addEventListener('DOMContentLoaded', () => {
    // Add event listener to the button for receiving data
    document.getElementById('receiveButton').addEventListener('click', receiveData);
});
