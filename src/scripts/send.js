/*************************************************
 * @file        : send.js    
 * @description : This is a java script file for
 *                send.html in public folder.
 *************************************************/

/**
 * Function to handle file uploading and displaying IP address
 */
async function uploadFile() {
    const fileInput = document.getElementById('file-input');
    const file = fileInput.files[0];
    if (file) {
        const formData = new FormData();
        formData.append('file', file);
        try {
            const response = await fetch('http://intentlab.iitk.ac.in:8080/upload', {
                method: 'POST',
                body: formData
            });



            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            console.log(`Systems IP: ${data.ip}`)
            document.getElementById('ipAddr').textContent = data.ip;
            document.getElementById('ipDisplay').style.display = 'block';
            document.getElementById('fileBox').style.display = 'none';
            document.getElementById('sendButton').style.display = 'none';

            // Optionally hide ipDisplay after after timeout
            setTimeout(() => {
                document.getElementById('ipDisplay').textContent = 'Timeout, Please start again !';
            }, 60000);

        } catch (error) {
            console.error('Error uploading file:', error);
            // Handle error as needed
        }
    }
}

// Add event listener once DOM content is loaded
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('sendButton').addEventListener('click', uploadFile);
});
