// Function to handle file selection
function handleFileSelect(event) {
    const files = event.target.files || event.dataTransfer.files;
    const fileList = document.getElementById('fileList');
    // Clear previous file items
    fileList.innerHTML = '';

    // Store selected files globally
    selectedFiles = Array.from(files);

    // Iterate through each selected file
    selectedFiles.forEach(file => {
        const fileItem = document.createElement('div');
        fileItem.className = 'file-item';
        fileItem.textContent = file.name;

        const removeBtn = document.createElement('button');
        removeBtn.className = 'remove-btn';
        removeBtn.innerHTML = '&#128465;'; // Unicode for trash can icon
        removeBtn.addEventListener('click', function () {
            fileItem.remove();
            removeFile(file);
        });

        fileItem.appendChild(removeBtn);
        fileList.appendChild(fileItem);
    });

    // Re-enable the plus button after files are selected
    document.getElementById('sendBtn').disabled = false;
}

// Function to remove a file from selection
function removeFile(file) {
    selectedFiles = selectedFiles.filter(f => f !== file);
}

// Function to zip files
async function zipFiles() {
    const zip = new JSZip();
    selectedFiles.forEach(file => {
        zip.file(file.name, file);
    });

    const content = await zip.generateAsync({ type: 'blob' });
    return content;
}

// Function to save zip file locally
function saveZipLocally(zipBlob) {
    const zipFileName = 'selected_files.zip';
    const a = document.createElement('a');
    document.body.appendChild(a);
    a.style = 'display: none';
    const url = window.URL.createObjectURL(zipBlob);
    a.href = url;
    a.download = zipFileName;
    a.click();
    window.URL.revokeObjectURL(url);
}

// Function to handle actual file sending
async function sendFiles() {
    if (selectedFiles.length === 0) {
        alert('No files selected for sending.');
        return;
    }

    const zipBlob = await zipFiles();
    saveZipLocally(zipBlob);

    // Optionally, you can send the zipBlob to a server here
    // For demonstration, we'll just log the zip blob
    console.log(zipBlob);
    alert('Files have been zipped and saved as "selected_files.zip"!');
}

// Event listener for send button click
document.getElementById('plusIcon').addEventListener('click', function () {
    document.getElementById('fileInput').click();
});

// Event listener for file input change
document.getElementById('fileInput').addEventListener('change', function (event) {
    handleFileSelect(event);
    // Do not clear the file input value to maintain selected files
});

// Event listener for actual send button click
document.getElementById('actualSendBtn').addEventListener('click', function () {
    sendFiles();
});

// Event listeners for drag and drop functionality
const dropZone = document.getElementById('dropZone');

dropZone.addEventListener('dragover', (event) => {
    event.preventDefault();
    dropZone.classList.add('dragging');
});

dropZone.addEventListener('dragleave', () => {
    dropZone.classList.remove('dragging');
});

dropZone.addEventListener('drop', (event) => {
    event.preventDefault();
    dropZone.classList.remove('dragging');
    handleFileSelect(event);
});

// Global variable to store selected files
let selectedFiles = [];
