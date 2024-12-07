/****************************************************************
 * @file        : send.js    
 * @description : JavaScript for send.html in the public folder.
 ****************************************************************/

/****************************
 * Frontend intraction code
 ***************************/

// Global variable to store selected files
let selectedFiles = [];

// Function to handle file selection
function handleFileSelect(event) {
    const newFiles = Array.from(event.target.files || event.dataTransfer.files);
    const fileList = document.getElementById('fileList');

    // Append new files to the existing selectedFiles array
    newFiles.forEach(file => {
        if (!selectedFiles.some(f => f.name === file.name && f.size === file.size)) {
            selectedFiles.push(file);
        }
    });

    // Clear the file list and re-render all files
    fileList.innerHTML = '';
    selectedFiles.forEach(file => {
        const fileItem = document.createElement('div');
        fileItem.className = 'file-item';
        fileItem.textContent = file.name;

        const removeBtn = createRemoveButton(file, fileItem);
        fileItem.appendChild(removeBtn);
        fileList.appendChild(fileItem);
    });

    // Check for overflow after updating the file list
    checkOverflow();
}

// Create a remove button for each file item
function createRemoveButton(file, fileItem) {
    const removeBtn = document.createElement('button');
    removeBtn.className = 'remove-btn';
    removeBtn.innerHTML = '&#128465;'; // Unicode for trash can icon
    removeBtn.addEventListener('click', () => {
        fileItem.remove();
        selectedFiles = selectedFiles.filter(f => f !== file);
        checkOverflow(); // Check overflow after removing an item
    });
    return removeBtn;
}

// Function to check for overflow and apply/remove border
function checkOverflow() {
    const fileList = document.getElementById('fileList');
    if (fileList.scrollHeight > fileList.clientHeight) {
        fileList.style.border = '1px solid #ccc';
    } else {
        fileList.style.border = 'none';
    }
}

// Function to zip files
async function zipFiles() {
    const zip = new JSZip();
    selectedFiles.forEach(file => zip.file(file.name, file));
    return await zip.generateAsync({ type: 'blob' });
}

// Initialize event listeners
function initializeEventListeners() {
    document.getElementById('addBtn').addEventListener('click', () => {
        document.getElementById('fileInput').click();
    });

    document.getElementById('fileInput').addEventListener('change', handleFileSelect);
    document.getElementById('actualSendBtn').addEventListener('click', sendFiles);

    const dropZone = document.getElementById('dropZone');
    dropZone.addEventListener('dragover', event => {
        event.preventDefault();
        dropZone.classList.add('dragging');
    });

    dropZone.addEventListener('dragleave', () => {
        dropZone.classList.remove('dragging');
    });

    dropZone.addEventListener('drop', event => {
        event.preventDefault();
        dropZone.classList.remove('dragging');
        handleFileSelect(event);
    });

    // Check for overflow on window resize
    window.addEventListener('resize', checkOverflow);
}

// Initialize the script
initializeEventListeners();

/******************
 * Backend code
 ******************/

// Function to handle actual file sending
async function sendFiles() {
    if (selectedFiles.length === 0) {
        alert('No files selected for sending.');
        return;
    }

    try {
        // Display the sender's IP address
        const ipAddress = '127.0.0.1'; // This is static; for real use, you'd need to fetch this from a backend service
        document.getElementById('ipAddr').textContent = ipAddress;
        document.getElementById('dropZone').style.display = 'none';
        document.getElementById('ipDisplay').style.display = 'block';

        // Zip the files
        const file = await zipFiles();
        const blob = new Blob([file], { type: 'application/zip' });

        // Simulate a delay of 5 seconds before initiating the download
        setTimeout(() => {
            // Create a temporary link element to trigger the download
            const a = document.createElement('a');
            a.href = URL.createObjectURL(blob);
            a.download = 'intrawebshare_files.zip';
            a.click();
            URL.revokeObjectURL(a.href);

            // Display success message
            document.getElementById('ipDisplay').style.display = 'none';
            document.getElementById('tagline').innerHTML = '<p>Sent successfully!</p>';

        }, 5000); // 5 seconds delay

    } catch (error) {
        console.error('Error sending files:', error);
    }
}

