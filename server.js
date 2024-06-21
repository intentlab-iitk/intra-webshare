const express = require('express');
const cors = require('cors');
const multer = require('multer');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 8080;

app.use(cors());
app.use(bodyParser.json());
const upload = multer({ storage: multer.memoryStorage() });

let fileStore = {};

/**
 * Function to extract IP Address from request
 * @param {*} req 
 * @returns forwardedIps
 */
function getClientIP(req) {
    const forwardedIps = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    if (!forwardedIps) {
        return '';
    }
    const ipv4Regex = /^::ffff:(\d+\.\d+\.\d+\.\d+)$/;
    const match = ipv4Regex.exec(forwardedIps);
    if (match) {
        return match[1];
    } else {
        return forwardedIps.split(',')[0];
    }
}

// Sender code
app.post('/upload', upload.single('file'), (req, res) => {
    const clientIP = getClientIP(req);
    const file = req.file;
    if (!file) {
        return res.status(400).json({ error: 'No file uploaded' });
    }

    // Store the file buffer associated with sender's IP temporarily
    fileStore[clientIP] = { buffer: file.buffer, originalName: file.originalname, mimetype: file.mimetype, timestamp: Date.now() };
    console.log(`[${clientIP}] Uploaded File: ${file.originalname}`);

    // Respond with sender's IP
    res.json({ ip: clientIP });
});

// Receiver code
app.post('/getfile', (req, res) => {
    const { senderIP } = req.body;
    const receiverIP = getClientIP(req);
    console.log(`[${receiverIP}] Requested File of: ${senderIP}`);

    // Check if there's a stored file buffer associated with senderIP
    if (senderIP && fileStore[senderIP]) {
        const { buffer, originalName, mimetype } = fileStore[senderIP];

        res.setHeader('Content-Disposition', `attachment; filename="${originalName}"`);
        res.setHeader('Content-Type', mimetype);
        res.send(buffer);

        console.log(`Sending file: ${originalName} to ${receiverIP}`);
        delete fileStore[senderIP]; // Clear the file after sending

    } else {
        console.log(`[Server] No file found for ${receiverIP} from ${senderIP}`);
        res.status(404).json({ error: 'File not found' });
    }
});

// Clean up expired files every 60 seconds
setInterval(() => {
    const now = Date.now();
    Object.keys(fileStore).forEach((ip) => {
        if (now - fileStore[ip].timestamp >= 60000) {
            console.log(`[${ip}] file expired`);
            delete fileStore[ip];
        }
    });
}, 60000);

// Listen on port
app.listen(port, () => {
    console.log(`Server running on http://0.0.0.0:${port}`);
});
